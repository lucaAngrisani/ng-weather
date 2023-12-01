import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { APP_INITIALIZER, enableProdMode, importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpInterceptorService } from 'app/http-interceptor.service';
import { AppComponent } from './app/app.component';
import { routing } from './app/app.routing';
import { LocationService } from './app/location.service';
import { WeatherService } from './app/weather.service';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (weatherService: WeatherService) => () => weatherService.init(),
      deps: [WeatherService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    importProvidersFrom(BrowserModule, FormsModule, routing, ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })),
    LocationService, WeatherService,
    provideHttpClient(withInterceptorsFromDi())
  ]
});
