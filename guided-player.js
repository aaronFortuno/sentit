// Schedule all stops and starts on the same audio clock so pausing also stops the waits.
export function initGuidedPlayer(entry, session, prompts, button, render) {
  let context;
  let buffers;
  let timeline = [];
  let frame;
  let busy = false;
  let loading = false;
  let failed = false;

  function paint() {
    cancelAnimationFrame(frame);
    const now = context?.currentTime ?? 0;
    const phase = timeline.find(step => now < step.end);
    const done = timeline.length > 0 && !phase;
    const running = Boolean(phase) && context.state === 'running';
    const action = done ? 'restartSession' : phase ? (running ? 'pause' : 'resume') : 'startSession';
    const status = failed ? 'audioError' : loading ? 'loadingSession' : done ? 'sessionEnded' : phase?.status;
    const countdown = phase?.countdown && !failed ? Math.ceil(phase.end - now) : null;
    render({ action, status, countdown, number: phase?.number, busy });
    if (running && !busy) frame = requestAnimationFrame(paint);
  }

  async function decode(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Audio unavailable');
    return context.decodeAudioData(await response.arrayBuffer());
  }

  async function start() {
    if (!context) {
      context = new (window.AudioContext ?? window.webkitAudioContext)();
      context.addEventListener('statechange', paint);
    }
    loading = true;
    paint();
    await context.resume();
    buffers ??= await Promise.all([
      decode(entry.audio),
      session.reading > 0 ? decode(prompts.prepare) : null,
      session.listens > 1 ? decode(prompts.repeat) : null,
    ]);

    const [activity, prepare, repeat] = buffers;
    const fragmentStart = entry.fragment.start;
    const fragmentDuration = activity.duration - fragmentStart;
    if (fragmentStart < 0 || fragmentDuration <= 0) throw new Error('Invalid fragment');

    let next = context.currentTime + 0.05;
    const steps = [];
    function append(status, duration, { buffer, offset = 0, countdown = false, number } = {}) {
      if (duration <= 0) return;
      if (buffer) {
        const source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);
        source.start(next, offset, duration);
      }
      next += duration;
      steps.push({ status, end: next, countdown, number });
    }

    append('sessionIntroduction', fragmentStart, { buffer: activity });
    if (prepare) {
      append('sessionReading', prepare.duration, { buffer: prepare });
      append('sessionReading', session.reading, { countdown: true });
    }
    for (let number = 1; number <= session.listens; number++) {
      if (number > 1) {
        append('sessionInterval', session.interval, { countdown: true });
        append('sessionNext', repeat.duration, { buffer: repeat });
      }
      append('sessionListening', fragmentDuration, { buffer: activity, offset: fragmentStart, number });
    }
    timeline = steps;
  }

  button.addEventListener('click', async () => {
    if (busy) return;
    busy = true;
    failed = false;
    paint();
    try {
      if (!timeline.length || context.currentTime >= timeline.at(-1).end) await start();
      else if (context.state === 'running') await context.suspend();
      else await context.resume();
    } catch {
      failed = true;
    } finally {
      busy = false;
      loading = false;
      paint();
    }
  });
  window.addEventListener('pagehide', () => context?.suspend().catch(() => {}));
  paint();
}
