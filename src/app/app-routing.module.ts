import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { RegisterComponent } from './pages/register/register.component';
import { SingleProductComponent } from './pages/single-product/single-product.component';
import { SingleUserComponent } from './pages/single-user/single-user.component';
import { ResolveService } from './services/resolve.service';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    // resolve: {'me': ResolveService}
  },
  {
    path: 'products',
    children: [
      {
        path: '',
        component: ProductsComponent,
      },
      {
        path: 'add',
        canDeactivate: [CanDeactivateGuard],
        component: AddProductComponent,
      },
      {
        path: ':id',
        component: SingleProductComponent,
      },
      {
        path: 'edit/:id',
        component: EditProductComponent
      }
    ],
  },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'edit-me', component: EditUserComponent },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'single',
    children: [
      {
        path: ':id',
        component: SingleUserComponent,
      },
      { path: '', component: SingleUserComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
