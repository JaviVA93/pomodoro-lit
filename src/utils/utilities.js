export function animationInterval(ms, signal, callback) {
    const start = document.timeline ? document.timeline.currentTime : performance.now();

    function frame(time) {
        if (signal.aborted)
            return;
        callback(time);
        scheduleFrame(time);
    }

    function scheduleFrame(time) {
        const elapsed = time - start;
        const roundedElapsed = Math.round(elapsed / ms) * ms;
        const targetNext = start + roundedElapsed + ms;
        const delay = targetNext - performance.now();
        setTimeout(() => requestAnimationFrame(frame), delay);
    }

    scheduleFrame(start);
}

export function secondsToMinutesAndSeconds(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return { minutes, remainingSeconds };
}

export function convertMilliseconds(milliseconds) {
    // Convert milliseconds to minutes
    const minutes = Math.floor(milliseconds / (1000 * 60));

    // Calculate remaining milliseconds after subtracting minutes
    milliseconds -= minutes * 1000 * 60;

    // Convert remaining milliseconds to seconds
    const seconds = Math.floor(milliseconds / 1000);

    // Calculate remaining milliseconds after subtracting seconds
    milliseconds -= seconds * 1000;

    return {
        minutes: minutes,
        seconds: seconds,
        milliseconds: milliseconds
    };
}