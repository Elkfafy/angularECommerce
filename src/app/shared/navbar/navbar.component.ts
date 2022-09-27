import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(public global: GlobalService, private toastr: ToastrService) {}

  ngOnInit(): void {}

  handleLogout() {
    const token: any = localStorage.getItem('token');
    this.global.logout().subscribe(
      (res: any) => {
        this.toastr.success('logged out');
        localStorage.removeItem('token');
        this.global.loginFlag = false;
      },
      (e) => {
        this.toastr.error('logging out failed');
      }
    );
  }
}
