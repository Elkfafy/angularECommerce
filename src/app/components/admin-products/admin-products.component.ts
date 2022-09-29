import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit {
  products: any;
  pageSize: number = 10;
  p: number = 1;
  total: any = 0;
  constructor(public global: GlobalService, private toastr: ToastrService) {
    this.getProducts(0, this.pageSize);
  }

  ngOnInit(): void {}

  getProducts(pageNumber: number, pageLimit: number = 10) {
    this.global.getProducts(pageNumber, pageLimit).subscribe(
      (res) => {
        this.products = res.data.products;
        this.total = res.data.count;
      },
      (e) => {
        console.log(e);
      }
    );
  }

  removeAproduct(id: any, index: any) {
    this.global.deleteProduct(id).subscribe(
      (res) => {
        this.products.splice(index, 1);
      },
      (e) => {
        console.log(e);
      }
    );
  }

  pageChanged(num: any) {
    this.getProducts(num - 1, this.pageSize);
    this.p = num;
  }
}
