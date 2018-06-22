import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class IpcService {

    constructor() {
    }

    public async send(channel, ...args): Promise<any> {
        const ipcRenderer = window['__bridge'].ipcRenderer;
        if (!ipcRenderer) {
            return Promise.reject('not in electron');
        }
        const replyChannel = channel + '-reply';
        return new Promise(function (resolve, reject) {
            ipcRenderer.once(replyChannel, (event, arg) => {
                resolve(arg);
            });
            ipcRenderer.send(channel, ...args);
        });
    }
}
