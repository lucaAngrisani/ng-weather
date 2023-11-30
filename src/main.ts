import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { routing } from './app/app.routing';
import { RouterModule } from '@angular/router';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { WeatherService } from './app/weather.service';
import { LocationService } from './app/location.service';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FormsModule, RouterModule, routing, ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })),
        LocationService, WeatherService,
        provideHttpClient(withInterceptorsFromDi())
    ]
});
