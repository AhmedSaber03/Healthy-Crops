import { provideRouter, Routes, withRouterConfig } from '@angular/router';
import { SubProductsComponent } from './sub-products/sub-products.component';
import { ProductDetailsComponent } from './sub-products/product-details/product-details.component';
import { LayoutComponent } from './layout/layout.component';
import { ProfileComponent } from './layout/profile/profile.component';
import { WalletComponent } from './layout/wallet/wallet.component';
import { CartComponent } from './layout/cart/cart.component';
import { AdvertsComponent } from './layout/adverts/adverts.component';
import { PostedAdComponent } from './layout/adverts/posted-ad/posted-ad.component';
import { AuctionsComponent } from './layout/adverts/auctions/auctions.component';
import { ArchivedComponent } from './layout/adverts/archived/archived.component';



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
    path: 'products/:type',
    loadComponent: () =>
      import('./sub-products/sub-products.component').then((m) => m.SubProductsComponent),
    data: { animation: 'subProductsPage' }, 
  },
  {
    path: 'product-details/:id',
    loadComponent: () =>
      import('./sub-products/product-details/product-details.component').then((m) => m.ProductDetailsComponent),
  },
  
  // { path: '', redirectTo: '/sub-products', pathMatch: 'full' },

  {
    path: 'contact-us',
    loadComponent: () =>
      import('./contactus/contactus.component').then((m) => m.ContactusComponent),
    data: { animation: 'contactuspage' }, 
  },
  {
    path: '',
    component: LayoutComponent, 
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'wallet', component: WalletComponent },
      { path: 'cart', component: CartComponent },
      { 
        path: 'adverts', 
        component: AdvertsComponent,
        children: [
          { path: 'posted-ad', component: PostedAdComponent }, 
          { path: '', redirectTo: 'posted-ad', pathMatch: 'full' },
          { path: 'auctions', component: AuctionsComponent },
          { path: 'archived', component: ArchivedComponent } 
        ]
      },
      { path: '', redirectTo: 'profile', pathMatch: 'full' }
    ]
  }
];

export const routerConfig = provideRouter(
  routes,
  withRouterConfig({ onSameUrlNavigation: 'reload' }) 
);

