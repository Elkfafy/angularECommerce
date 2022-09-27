import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/services/global.service';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  loginForm = new FormGroup({
    image: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl(20, [Validators.required]),
    profilePic: new FormControl(),
  });
  errMessage = '';
  imgSrc: any = '';
  isSubmitted = false;
  get userData() {
    return this.loginForm.controls;
  }
  constructor(
    private global: GlobalService,
    private router: Router,
    private toastr: ToastrService
  ) {
    if (!this.global.loginFlag) {
      this.toastr.warning('You Should Login First!');
      this.router.navigateByUrl('/login');
    }
    this.global.getMe().subscribe(
      (res) => {
        this.loginForm.patchValue(this.global.user);
        this.imgSrc = `http://localhost:7777/${this.loginForm.value.image}`;
      },
      (e) => {
        console.log(e);
      }
    );
  }

  ngOnInit(): void {}

  handleEdit() {
    this.isSubmitted = true;
    const formData = new FormData();
    const container: any = { ...this.userData };
    Object.keys(container).forEach((key) => {
      formData.append(key, container[key].value);
    });
    this.global.editMe(formData).subscribe(
      (res) => {
        console.log(res.data);
        console.log(this.global.user);
        this.global.user = res.data;
        this.loginForm.patchValue(this.global.user);
      },
      (e) => {
        console.log(e);
      }
    );
  }

  createImgUrl(event: any) {
    if (event.target.files[0]) {
      this.loginForm.patchValue({
        profilePic: event.target.files[0],
      });
      const reader = new FileReader();
      reader.onload = () => {
        this.imgSrc = reader.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
