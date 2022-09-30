import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angularECommerce';
  constructor(private global: GlobalService, private activated: ActivatedRoute) {
    const token = localStorage.getItem('token');
    if (token) {
      this.global.loginFlag = true
      // this.global.user = activated.snapshot.data['me']
      this.global.getMe().subscribe(
        (res: any) => {
          this.global.user = res.data;
        },
        (e: any) => {
          console.log(e);
          this.global.loginFlag = false;
        }
      );
    }
  }
}
