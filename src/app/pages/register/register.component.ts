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
  errMessage: string = '';
  constructor(
    private global: GlobalService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  handleRegister(registerForm: NgForm) {
    if (registerForm.valid) {
      this.global.register(this.userData).subscribe(
        (res: any) => {
          this.toastr.success('Register Succeded');
          localStorage.setItem('token', res.data.token);
          this.global.loginFlag = true;
          this.router.navigateByUrl('/');
        },
        (e: any) => {
          this.toastr.error('Registeration Failed');
          if (e.error.data.keyPattern.email) {
            this.errMessage = 'email has been registered before';
          }
        }
      );
    }
  }
}
