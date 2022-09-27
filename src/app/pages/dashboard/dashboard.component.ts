import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private global: GlobalService, private router: Router, private toastr: ToastrService) {
    if (!global.loginFlag || global.user.userType != 'admin') {
      this.toastr.warning("You Aren't an Admin!")
      router.navigateByUrl('/login')
      return
    }
   }

  ngOnInit(): void {
  }

}
