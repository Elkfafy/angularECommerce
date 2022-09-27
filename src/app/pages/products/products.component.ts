import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any = [];
  isLoading: boolean = true;
  constructor(
    private global: GlobalService,
    private activated: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.global.getProducts().subscribe(
      (res: any) => {
        const queries: any = this.activated.snapshot.queryParamMap;
        console.log(queries.params);
        Object.keys(queries.params).forEach((key) => {
          res.data = res.data.filter((product: any) => {
            return product[key] == queries.params[key];
          });
          console.log(res.data);
        });
        this.products = res.data;
      },
      (e: any) => console.log(e),
      () => {
        this.isLoading = false;
      }
    );
  }
}
