import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home-page/home-page.component').then((m) => m.HomePageComponent),
    data: { animation: 'HomePage' },
  },
  {
    path: 'about-us',
    loadComponent: () =>
      import('./about-us/about-us.component').then((m) => m.AboutUsComponent),
    data: { animation: 'AboutUsPage' }, // Unique animation data for about-us
  },
];

