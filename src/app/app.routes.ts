import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IsAuthenticatedGuard } from './guard/is-authenticated.guard';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    canActivate: [IsAuthenticatedGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [IsAuthenticatedGuard],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
