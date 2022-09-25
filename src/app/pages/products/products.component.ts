import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any = [];
  isLoading: boolean = true;
  constructor(private global: GlobalService) {}

  ngOnInit(): void {
    this.global.getProducts().subscribe(
      (data: any) => {
        this.products = data.data;
      },
      (e: any) => console.log(e),
      () => {
        this.isLoading = false;
      }
    );
  }
}
