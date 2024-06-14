// System Utils
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// App Utils
import { AuthGuard } from '../../core/guards/auth.guard';
import { LogoutGuard } from '../../core/guards/logout.guard';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ResetComponent } from './reset/reset.component';
import { NotFoundComponent } from '../errors/not-found/not-found.component';

// Supported routes
const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'signin',
        component: SigninComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'registration',
        component: SignupComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'reset',
        component: ResetComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'logout',
        component: SigninComponent,
        canActivate: [LogoutGuard],
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ],
  },
];

// Configuration
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})

// Logic
export class AuthRoutingModule { }
