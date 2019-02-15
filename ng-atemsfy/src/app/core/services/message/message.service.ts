import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    constructor() { }

    public success(message, config = {}) {
        this.showMessage('atemsfy-message-success', message, config['title'] || 'Sucesso', config['position'] || 'top-right');
    }

    public info(message, config) {
        this.showMessage('atemsfy-message-info', , message, config['title'] || 'Info', config['position'] || 'top-right');
    }

    public warning(message, config) {
        this.showMessage('atemsfy-message-warning', , message, config['title'] || 'Atenção', config['position'] || 'top-right');
    }

    public error(message, config) {
        this.showMessage('atemsfy-message-error', , message, config['title'] || 'Erro', config['position'] || 'top-right');
    }

    private showMessage(message_class, text, title, position) {
        let container = document.getElementById(`atemsfy-messages-${position}`);
        let [message, message_id] = this.messageTemplate(message_class, text, title);
        container.innerHTML += message;
        setTimeout(() => {
            document.getElementById(message_id).remove()
        }, 2000);
    }

    private messageTemplate(message_class, text, title) {
        let time = new Date().getTime();
        return [`\
            <div id="message_${time}" class="atemsfy-message ${message_class}">\
                ${title}\
                ${text}\
            </div>\
        `, `message_${time}`];
    }
}
