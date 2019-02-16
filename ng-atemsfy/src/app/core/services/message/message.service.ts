import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    private default_duration = 4000;

    constructor() { }

    public success(message, config = {}) {
        this.showMessage(
            'atemsfy-message-success',
            message, config['title'] || 'Sucesso',
            config['position'] || 'top-right',
            config['duration'] || this.default_duration
        );
    }

    public info(message, config) {
        this.showMessage(
            'atemsfy-message-info',
            message, config['title'] || 'Info',
            config['position'] || 'top-right',
            config['duration'] || this.default_duration
        );
    }

    public warning(message, config) {
        this.showMessage(
            'atemsfy-message-warning',
            message, config['title'] || 'Atenção',
            config['position'] || 'top-right',
            config['duration'] || this.default_duration
        );
    }

    public error(message, config) {
        this.showMessage(
            'atemsfy-message-error',
            message, config['title'] || 'Erro',
            config['position'] || 'top-right',
            config['duration'] || this.default_duration
        );
    }

    private showMessage(message_class, text, title, position, duration) {
        let container = document.getElementById(`atemsfy-messages-${position}`);
        let message_element = this.messageTemplate(message_class, text, title, position, duration);
        message_element.onclick = function() {
            message_element.remove();
        }
        container.appendChild(message_element);
        setTimeout(() => {
            message_element.remove();
        }, duration);
    }

    private messageTemplate(message_class, text, title, position, duration) {
        let time = new Date().getTime();
        let bar_hide = 'atemsfy-message-bar-hide';
        let animation_hide = 'atemsfy-message-animation-bar-hide';
        if (position === 'left-center' || position === 'right-center') {
            bar_hide = 'atemsfy-message-bar-hide-vertical';
            animation_hide = 'atemsfy-message-animation-bar-hide-vertical';
        }
        let element = document.createElement('div');
        element.id = `message_${time}`;
        element.classList.add('atemsfy-message');
        element.classList.add(message_class);
        element.innerHTML = `\
            <div class="atemsfy-message-content">
                <div class="atemsfy-message-title">${title}</div>\
                <div class="atemsfy-message-text">${text}</div>\
            </div>
            <div class="${bar_hide}"\
                style="animation: ${animation_hide} ${duration / 1000}s;">\
            </div>\
        `;
        return element;
    }
}
