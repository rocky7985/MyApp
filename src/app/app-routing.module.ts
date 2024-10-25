import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'signup',
    pathMatch: 'full'
  },
  {
    path: 'insert',
    loadChildren: () => import('./insert/insert.module').then( m => m.InsertPageModule)
  },
  {
    path: 'shoppage',
    loadChildren: () => import('./shoppage/shoppage.module').then( m => m.ShoppagePageModule)
  },
  {
    path: 'view-single',
    loadChildren: () => import('./view-single/view-single.module').then( m => m.ViewSinglePageModule)
  },
  {
    path: 'add-subject',
    loadChildren: () => import('./add-subject/add-subject.module').then( m => m.AddSubjectPageModule)
  },
  {
    path: 'add-product-category',
    loadChildren: () => import('./add-product-category/add-product-category.module').then( m => m.AddProductCategoryPageModule)
  },
  {
    path: 'category-page',
    loadChildren: () => import('./category-page/category-page.module').then( m => m.CategoryPagePageModule)
  },
  {
    path: 'update-category',
    loadChildren: () => import('./update-category/update-category.module').then( m => m.UpdateCategoryPageModule)
  },
  {
    path: 'datetime',
    loadChildren: () => import('./datetime/datetime.module').then( m => m.DatetimePageModule)
  },
  {
    path: 'schedule',
    loadChildren: () => import('./schedule/schedule.module').then( m => m.SchedulePageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'allposts',
    loadChildren: () => import('./allposts/allposts.module').then( m => m.AllpostsPageModule)
  },
  {
    path: 'single-post',
    loadChildren: () => import('./single-post/single-post.module').then( m => m.SinglePostPageModule)
  },
  {
    path: 'update-post',
    loadChildren: () => import('./update-post/update-post.module').then( m => m.UpdatePostPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
