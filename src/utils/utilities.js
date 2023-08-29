
/**
 * 
 * @param {AbortSignal} signal 
 * @param {Function} callback 
 */
export function callFunctionEachFrame(signal, callback) {
    function frame() {
        if (signal.aborted)
            return

        callback()
        scheduleFrame()
    }

    function scheduleFrame() {
        requestAnimationFrame(frame)
    }
    scheduleFrame();
}



/**
 * 
 * @param {number} seconds 
 * @returns {{minutes: number, remainingSeconds: number}}
 */
export function secondsToMinutesAndSeconds(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return { minutes, remainingSeconds };
}



/**
 * 
 * @param {number} milliseconds 
 * @returns {{minutes: number, seconds: number, milliseconds: number}}
 */
export function convertMilliseconds(milliseconds) {
    const minutes = Math.floor(milliseconds / (1000 * 60));
    milliseconds -= minutes * 1000 * 60;

    const seconds = Math.floor(milliseconds / 1000);
    milliseconds -= seconds * 1000;

    return {
        minutes: minutes,
        seconds: seconds,
        milliseconds: milliseconds
    };
}

