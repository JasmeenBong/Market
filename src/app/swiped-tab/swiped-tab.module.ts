import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SwipedTabPage } from './swiped-tab.page';

const routes: Routes = [
  {
    path: '',
    component: SwipedTabPage,
    children: [
      {
        path: 'login',
        children: [
          {
            path: '',
            loadChildren: '../login/login.module#LoginPageModule'
          }
        ]
      },
      {
        path: 'register',
        children: [
          {
            path: '',
            loadChildren: '../register/register.module#RegisterPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/swiped-tab/login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/swiped-tab/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SwipedTabPage]
})
export class SwipedTabPageModule {}
