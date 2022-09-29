import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-admin-add-category',
  templateUrl: './admin-add-category.component.html',
  styleUrls: ['./admin-add-category.component.css'],
})
export class AdminAddCategoryComponent implements OnInit {
  name: any;
  constructor(
    private global: GlobalService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  addCategory() {
    this.global.addCategory(this.name).subscribe(
      (res) => {
        this.toastr.success(`${this.name} category added`);
      },
      (e) => {
        console.log(e);
        this.toastr.error('category adding failed');
      }
    );
  }
}
