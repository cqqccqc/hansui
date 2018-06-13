import { EventEmitter } from 'events';

class Bridge extends EventEmitter {
    public ipcRenderer;

    constructor() {
        super();
    }

    on(event: string | symbol, listener: (...args: any[]) => void): this {
        return super.on(event, listener);
    }
    public async ready() {
        const self = this;
        return new Promise(function (resolve, reject) {
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
