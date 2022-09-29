import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userData: User = {
    profilePic: '',
    name: '',
    age: 20,
    email: '',
    password: '',
    userType: '',
  };
  imgSrc: any;
  errMessage: string = '';
  constructor(
    private global: GlobalService,
    private router: Router,
    private toastr: ToastrService
  ) {
    if (this.global.loginFlag) {
      toastr.warning('You Have Already Logged In!');
      router.navigateByUrl('/');
      return;
    }
  }

  ngOnInit(): void {
    if (this.global.loginFlag) {
      this.toastr.warning('You Have Already Logged In!');
      this.router.navigateByUrl('/');
      return;
    }}

  handleRegister(registerForm: NgForm) {
    if (registerForm.valid) {
      const formData = new FormData();

      const user: any = { ...this.userData };
      Object.keys(user).forEach((key) => {
        formData.append(key, user[key]);
      });
      this.global.register(formData).subscribe(
        (res: any) => {
          this.toastr.success('Register Succeded');
          localStorage.setItem('token', res.data.token);
          this.global.loginFlag = true;
          this.global.user = res.data.user
          this.router.navigateByUrl('/');
        },
        (e: any) => {
          console.log(e)
          this.toastr.error('Registeration Failed');
          if (e.error.data?.keyPattern.email) {
            this.errMessage = 'email has been registered before';
          } else {
            this.errMessage = e.error.message;
          }
        }
      );
    }
  }
  createImgUrl(ele: any) {
    if (ele.files[0]) {
      this.userData.profilePic = ele.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imgSrc = reader.result;
      };
      reader.readAsDataURL(ele.files[0]);
    }
  }
}
