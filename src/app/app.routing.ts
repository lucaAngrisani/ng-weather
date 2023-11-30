import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import("./main-page/main-page.component")
  },
  {
    path: 'forecast/:zipcode',
    loadComponent: () => import("./forecasts-list/forecasts-list.component")
  }
];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes, {});
