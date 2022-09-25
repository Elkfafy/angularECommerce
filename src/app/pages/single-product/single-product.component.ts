import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css'],
})
export class SingleProductComponent implements OnInit {
  product: any;
  isLoading: boolean = true;
  constructor(
    private global: GlobalService,
    private activated: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const productId = this.activated.snapshot.paramMap.get('id');
    this.global.getSingleProduct(productId).subscribe(
      (data: any) => {
        this.product = data.data;
      },
      (e: any) => console.log(e),
      () => (this.isLoading = false)
    );
  }
}
