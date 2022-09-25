import { Component } from '@angular/core';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularECommerce';
  constructor(private global: GlobalService) {
    const token = localStorage.getItem('token')
    if (token) this.global.loginFlag = true
  }
}
