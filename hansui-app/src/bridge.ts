import { EventEmitter } from 'events';

class Bridge extends EventEmitter {
    public ipcRenderer;

    constructor() {
        super();
    }

    on(event: string | symbol, listener: (...args: any[]) => void): this {
        return super.on(event, listener);
    }
    ready() {
        const self = this;
        return new Promise(function (resolve, reject) {
            // ua中不带Electron， 则认为不是electron环境
            if (window.navigator.userAgent.toLowerCase().indexOf('electron') < 0) {
                reject(new Error('not in electron'));
                return;
            }
            self.on('electron-ready', (nativeInterface) => {
                self.ipcRenderer = nativeInterface.ipcRenderer;
                resolve();
            });
        });
    }
}

const bridge = new Bridge;

// export to global
window['__bridge'] = bridge;

export default bridge;
