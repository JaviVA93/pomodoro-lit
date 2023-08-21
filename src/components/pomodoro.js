import { LitElement, html, css } from "lit";
import animationInterval from "../utils/animationInterval";

class Pomodoro extends LitElement {

    static properties = {
        timer: 0,
        running: false,
    };

    constructor() {
        super()

        this.timerInitValue = 60
        this.restartCountdown()
        this.controller = new AbortController()
        this.running = false
    }

    static styles = css`
        :host,
        :host * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        :host {
            font-size: 16px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            padding: 30px 60px;
            border: 1px solid grey;
            border-radius: 8px;
        }
        .buttonsWrapper {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .buttonsWrapper button {
            padding: 5px 15px;
        }
    `

    startCountdown() {
        if (this.running || this.timer <= 0)
            return

        this.controller = new AbortController()
        this.running = true

        animationInterval(1000, this.controller.signal, (time) => {
            this.timer--

            if (this.timer <= 0)
                this.stopCountdown()            
        });
    }

    stopCountdown() {
        if (!this.running)
            return

        this.controller.abort()
        this.running = false
    }

    restartCountdown() {
        this.stopCountdown()
        this.timer = this.timerInitValue
    }

    render() {
        return html`
            <h3>Pomodoro</h3>
            <h1>${this.timer}</h1>
            <div class="buttonsWrapper">
                <button @click=${() => this.startCountdown()}>${(!this.running) ? 'Start' : 'Pause'}</button>
                <button @click=${() => this.restartCountdown()}>Restart</button>
            </div>
        `
    }
}


window.customElements.define('pomodoro-lit', Pomodoro)