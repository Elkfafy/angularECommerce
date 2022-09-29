import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent implements OnInit {
  users: any;
  pageSize: number = 10;
  p: number = 1;
  total: any = 0;
  constructor(public global: GlobalService, private toastr: ToastrService) {
    this.getUsers(0, this.pageSize);
  }

  ngOnInit(): void {}

  getUsers(pageNumber: number, pageLimit: number = 10) {
    this.global.getAllUsers(pageNumber, pageLimit).subscribe(
      (res) => {
        this.users = res.data.users;
        this.total = res.data.count;
      },
      (e) => {
        console.log(e);
      }
    );
  }

  changeStatus(id: any, index: any, status: any) {
    this.global.changeStatus(id, status).subscribe(
      (res) => {
        this.users[index].status = !this.users[index].status;
        this.toastr.success('status changed')
      },
      (e) => {console.log(e)
      this.toastr.error('error has happened')}
    );
  }

  removeAuser(id: any, index: any) {
    this.global.deleteUser(id).subscribe(res => {
      this.users.splice(index, 1)
    }, e => {console.log(e)})
  }

  pageChanged(num: any) {
    this.getUsers(num - 1, this.pageSize);
    this.p = num;
  }
}
