import { LitElement, html, css } from "lit";
import animationInterval from "../utils/animationInterval";
import { VIEWS, LEVELS } from "../utils/constants";

class Pomodoro extends LitElement {

    static properties = {
        timer: 0,
        running: false,
        initialValue: '',
        view: '',
        level: 0
    };

    constructor() {
        super()

        this.controller = new AbortController()
        this.running = false
        this.level = LEVELS.MID
        this.view = VIEWS.POMODORO
        this.restartCountdown()
    }

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
        this.timer = this.level
    }

    handleStartStopButton() {
        (!this.running)
            ? this.startCountdown()
            : this.stopCountdown()
    }

    changeLevel(event) {
        this.level = parseInt(event.target.value)
        this.restartCountdown()
    }

    changeView() {
        (this.view === VIEWS.POMODORO)
            ? this.view = VIEWS.SETTINGS
            : this.view = VIEWS.POMODORO
    }

    render() {
        return html`
            <button
                class="settingsBtn" 
                @click=${() => this.changeView()}>
               ${(this.view === VIEWS.POMODORO) ? 'Settings' : 'Back'}
            </button>
            ${(this.view === VIEWS.POMODORO)
                ? html`
                    <h3>Pomodoro</h3>
                    <h1>${this.timer}</h1>
                    <div class="buttonsWrapper">
                        <button @click=${() => this.handleStartStopButton()}>
                            ${(!this.running) ? 'Start' : 'Pause'}
                        </button>
                        <button @click=${() => this.restartCountdown()}>
                            Restart
                        </button>
                    </div>`
                : html`
                    <label>
                        Level
                        <select @change=${(e) => this.changeLevel(e)}>
                            <option value="${LEVELS.LOW}">Low (10min)</option>
                            <option value="${LEVELS.MID}">Medium (20min)</option>
                            <option value="${LEVELS.HIGH}">High (40min)</option>
                        </select>
                    </label>
                `
            }
        `
    }

    static styles = css`
        :host,
        :host * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        :host {
            position: relative;
            font-size: 16px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            padding: 30px 60px;
            border: 1px solid grey;
            border-radius: 8px;
        }
        .settingsBtn {
            padding: 5px;
            position: absolute;
            top: 0;
            right: 0;
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
}


window.customElements.define('pomodoro-lit', Pomodoro)