import { AUDIO_PATHS } from "./constants";

export default function playAudio() {
    return {
        alarm: function() {
            const audio = new Audio(AUDIO_PATHS.ALARM);
            audio.play();
        },
        pop: function() {
            const audio = new Audio(AUDIO_PATHS.POP);
            audio.play();
        }
    }
}