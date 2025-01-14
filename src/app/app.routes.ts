import { provideRouter, Routes, withRouterConfig } from '@angular/router';


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
    data: { animation: 'AboutUsPage' }, 
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./sub-products/sub-products.component').then((m) => m.SubProductsComponent),
    data: { animation: 'subProductsPage' }, 
  },
  {
    path: 'contact-us',
    loadComponent: () =>
      import('./contactus/contactus.component').then((m) => m.ContactusComponent),
    data: { animation: 'contactuspage' }, 
  },

  {
    path: 'product-details/:id', 
    loadComponent: () =>
      import('./sub-products/sub-products.component').then(
        (m) => m.SubProductsComponent
      ),
  },
];

export const routerConfig = provideRouter(
  routes,
  withRouterConfig({ onSameUrlNavigation: 'reload' }) 
);

