import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'inbox', loadChildren: './inbox/inbox.module#InboxPageModule' },
  { path: 'favourite', loadChildren: './favourite/favourite.module#FavouritePageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'sell', loadChildren: './sell/sell.module#SellPageModule' },
  // { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  // { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'categories', loadChildren: './categories/categories.module#CategoriesPageModule' },
  { path: 'my-product', loadChildren: './my-product/my-product.module#MyProductPageModule' },
  { path: 'product', loadChildren: './product/product.module#ProductPageModule' },
<<<<<<< HEAD
  { path: 'swiped-tab', loadChildren: './swiped-tab/swiped-tab.module#SwipedTabPageModule' },
=======
  // { path: 'swiped-tab', loadChildren: './swiped-tab/swiped-tab.module#SwipedTabPageModule' },
  // // { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  // // { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  // { path: 'swiped-tab', loadChildren: './swiped-tab/swiped-tab.module#SwipedTabPageModule' },
>>>>>>> fe6c4d04be40376be8a7b9f2039bc3b53086b9aa
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
