import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.css']
})
export class SingleUserComponent implements OnInit {
  user: any
  userId = this.activated.snapshot.paramMap.get('id')
  isMine = true
  constructor(public global: GlobalService, private activated: ActivatedRoute, private router: Router, private toastr: ToastrService) {
    this.global.getMe().subscribe((res: any) => {
      this.user = res.data
      if (this.userId) {
        this.isMine = false
        if (this.user.userType == 'admin')
          this.global.getUser(this.userId).subscribe((res: any) => {
            this.user = res.data
          }, (e) => {console.log(e)})
        else {
          this.toastr.warning("You aren't authorized")
          this.router.navigateByUrl('/')
        }
      }
    }, (e) => {
      console.log(e)
      this.toastr.warning('Login First!')
      this.router.navigateByUrl('/login')
    })
  }

  ngOnInit(): void {
  }


  handleDelete() {
    this.global.deleteMe().subscribe((res: any) => {
      this.toastr.success('user deleted')
      localStorage.removeItem('token')
      this.global.loginFlag = false
      this.global.user = {}
      this.router.navigateByUrl('/')
    }, (e) => {
      console.log(e) 
      this.toastr.error('server error')
    })
  }

  addAddress() {

  }


}
