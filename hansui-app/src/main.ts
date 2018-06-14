import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import bridge from './bridge';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

bridge.ready().then(() => {
    platformBrowserDynamic().bootstrapModule(AppModule)
        .catch(err => console.log(err));
}).catch((err) => {
    console.error(err);
});

