import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ProductsComponent } from './pages/products/products.component';
import { SingleProductComponent } from './pages/single-product/single-product.component';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SingleUserComponent } from './pages/single-user/single-user.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { CartComponent } from './pages/cart/cart.component';
import { ImageSiderComponent } from './components/image-sider/image-sider.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms'
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SideImagesComponent } from './components/side-images/side-images.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminCategoriesComponent } from './components/admin-categories/admin-categories.component';
import { AdminAddCategoryComponent } from './components/admin-add-category/admin-add-category.component';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductsComponent,
    SingleProductComponent,
    IndexComponent,
    LoginComponent,
    RegisterComponent,
    SingleUserComponent,
    EditUserComponent,
    EditProductComponent,
    AddProductComponent,
    CartComponent,
    ImageSiderComponent,
    DashboardComponent,
    SideImagesComponent,
    AdminUsersComponent,
    AdminProductsComponent,
    AdminCategoriesComponent,
    AdminAddCategoryComponent,
    AddToCartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
