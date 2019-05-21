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
  { path: 'swiped-tab', loadChildren: './swiped-tab/swiped-tab.module#SwipedTabPageModule' },
  { path: 'chatbox', loadChildren: './chatbox/chatbox.module#ChatboxPageModule' },
  { path: 'modal', loadChildren: './modal/modal.module#ModalPageModule' },
  { path: 'filter-modal', loadChildren: './filter-modal/filter-modal.module#FilterModalPageModule' },
  { path: 'report', loadChildren: './report/report.module#ReportPageModule' },
  { path: 'change-password', loadChildren: './change-password/change-password.module#ChangePasswordPageModule' },
  { path: 'verify-email', loadChildren: './verify-email/verify-email.module#VerifyEmailPageModule' },
  { path: 'forgot-password', loadChildren: './forgot-password/forgot-password.module#ForgotPasswordPageModule' },
  { path: 'chatbox', loadChildren: './chatbox/chatbox.module#ChatboxPageModule' },
  { path: 'chatbox', loadChildren: './chatbox/chatbox.module#ChatboxPageModule' },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
