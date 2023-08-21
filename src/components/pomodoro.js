import { LitElement, html, css } from "lit";
import animationInterval from "../utils/animationInterval";

class Pomodoro extends LitElement {

    static properties = {
        timer: 0,
    };

    constructor() {
        super()
        
        this.timer = 60
        this.controller = new AbortController();
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
        if (this.running)
            return

        this.controller = new AbortController()
        animationInterval(1000, this.controller.signal, (time) => {
            this.timer = this.timer - 1;
            console.log('tick!', time);
        });
        this.running = true
    }

    stopCountdown() {
        if (!this.running)
            return

        this.controller.abort()
        this.running = false
    }

    render() {
        return html`
            <h3>Pomodoro</h3>
            <h1>${this.timer}</h1>
            <div class="buttonsWrapper">
                <button @click=${() => this.startCountdown()}>Start</button>
                <button @click=${() => this.stopCountdown()}>Stop</button>
            </div>
        `
    }
}


window.customElements.define('pomodoro-lit', Pomodoro)