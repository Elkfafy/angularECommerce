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
  isMine = false
  constructor(
    public global: GlobalService,
    private activated: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const productId = this.activated.snapshot.paramMap.get('id');
    this.global.getSingleProduct(productId).subscribe(
      (res: any) => {
        this.product = {...res.data};
        if (this.product.vendorId == this.global.user._id) this.isMine = true
        this.product.images = []
        res.data.images.forEach((image: any) => {
          this.product.images.push(this.global.backendUrl + image)
        })
        console.log(this.product.images)
      },
      (e: any) => console.log(e),
      () => (this.isLoading = false)
    );
  }
}
