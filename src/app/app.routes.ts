import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/splash-screen/splash-screen.component').then(m => m.SplashScreenComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
    {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'menu',
    loadComponent: () => import('./pages/menu/menu.page').then(m => m.MenuPage),
     canActivate: [authGuard]
  },
  {
    path: 'galeria',
    loadComponent: () => import('./pages/galeria-tabs/galeria-tabs.page').then(m => m.GaleriaTabsPage),
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/galeria-tabs/tab1/tab1.page').then(m => m.Tab1Page)
      },
      {
        path: 'camara',
        loadComponent: () => import('./pages/galeria-tabs/tab2/tab2.page').then(m => m.Tab2Page)
      },
      {
        path: 'fotos',
        loadComponent: () => import('./pages/galeria-tabs/tab3/tab3.page').then(m => m.Tab3Page)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
    {
    path: 'api',
    loadComponent: () => import('./pages/api_consuming/country-search.page').then(m => m.CountrySearchPage),
    canActivate: [authGuard], 
  },
{
  path: 'api/country/:cca3',          // <-- ruta nueva
  loadComponent: () =>
    import('./pages/country-detail/country-detail.page').then(m => m.CountryDetailPage),
  canActivate: [authGuard]
},
];