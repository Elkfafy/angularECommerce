import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {
  categories: any;
  pageSize: number = 10;
  p: number = 1;
  total: any = 0;
  constructor(public global: GlobalService, private toastr: ToastrService) {
    this.getCategories(0, this.pageSize);
  }

  ngOnInit(): void {}

  getCategories(pageNumber: number, pageLimit: number = 10) {
    this.global.getCategories(pageNumber, pageLimit).subscribe(
      (res) => {
        this.categories = res.data.categories;
        this.total = res.data.count;
      },
      (e) => {
        console.log(e);
      }
    );
  }


  removeAcategory(id: any, index: any) {
    this.global.deleteCategory(id).subscribe(res => {
      this.categories.splice(index, 1)
    }, e => {console.log(e)})
  }

  pageChanged(num: any) {
    this.getCategories(num - 1, this.pageSize);
    this.p = num;
  }
}
