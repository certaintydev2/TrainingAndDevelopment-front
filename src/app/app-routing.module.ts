import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth/auth-guard.guard';


const routes: Routes = [

  { path: 'auth',  loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },

  { path: 'page', canActivate:[AuthGuardGuard], loadChildren: () => import('./page/page.module').then(m => m.PageModule) },

  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
