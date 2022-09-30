import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/interfaces/login';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData: Login = {
    email: '',
    password: '',
  };
  errMessage = '';
  constructor(
    private global: GlobalService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    console.log(this.global.loginFlag)
    setTimeout(() => console.log(this.global.loginFlag), 1000)
    if (this.global.loginFlag) {
      this.toastr.warning('You Have Already Logged In!');
      this.router.navigateByUrl('/');
      return;
    }}
  handleLogin(loginForm: NgForm) {
    if (loginForm.valid) {
      this.global.login(this.loginData).subscribe(
        (res: any) => {
          this.toastr.success('Login Succeded');
          localStorage.setItem('token', res.data.token);
          this.global.loginFlag = true;
          this.global.user = res.data.user
          this.global.cart = {
            userId: res.data.user._id,
            products: [],
            totalPrice: 0
          }
          this.router.navigateByUrl('/');
        },
        (e: any) => {
          this.toastr.error('Login Failed');
          this.errMessage = 'Email or Password is incorrect';
        }
      );
    }
  }
}
