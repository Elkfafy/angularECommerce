import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/services/global.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})

export class ProductsComponent implements OnInit {
  products: any;
  pageSize: number = 12;
  p: number = 1;
  total: any = 0;
  isLoading: boolean = true
  constructor(public global: GlobalService, private toastr: ToastrService) {
    this.getProducts(0, this.pageSize);
  }

  ngOnInit(): void {}

  getProducts(pageNumber: number, pageLimit: number = 10) {
    this.global.getProducts(pageNumber, pageLimit).subscribe(
      (res) => {
        this.products = res.data.products;
        this.isLoading = false
        this.total = res.data.count;
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
