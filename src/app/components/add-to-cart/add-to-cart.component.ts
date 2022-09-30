import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {
  @Input() productId : any
  @Input() productPrice: number = 0
  isAdded = false
  productIndex: any
  constructor(public global: GlobalService) {
    this.productIndex = this.global.cart.products.findIndex((product: any) => product.productId == this.productId)
    if (this.productIndex > -1) this.isAdded = true
  }



  ngOnInit(): void {
  }

  handleAdding() {
    const product = {
      productId: this.productId,
      count: 1 
    }
    this.global.cart.products.push(product)
    this.productIndex = this.global.cart.products.length - 1
    this.isAdded = true
  }

  handleDec() {
    this.global.cart.products[this.productIndex].count--;
    this.global.cart.totalPrice -= this.productPrice
    if (this.global.cart.products[this.productIndex].count == 0) {
      this.isAdded = false
      this.global.cart.products.splice(this.productIndex, 1)
    }
  }

  handleInc() {
    this.global.cart.products[this.productIndex].count++;
    this.global.cart.totalPrice += this.productPrice
  }
}
