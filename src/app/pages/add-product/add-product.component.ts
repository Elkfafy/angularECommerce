import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  productData: Product = {
    title: '',
    price: 0,
    desc: '',
    category: '',
    thumnail: null,
    images: null,
  };
  errMessage: string = '';
  thumnailSrc: any;
  imagesSrc: any = [];
  constructor(
    private global: GlobalService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  addProduct(addProductForm: any) {}

  createImgUrl(ele: any) {
    if (ele.files[0]) {
      this.productData.thumnail = ele.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.thumnailSrc = reader.result;
      };
      reader.readAsDataURL(ele.files[0]);
      console.log(this.productData);
    }
  }
  async createImgsUrl(ele: any) {
    if (ele.files[0]) {
      this.imagesSrc = [];
      this.productData.images = ele.files;
      for (let file of ele.files) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagesSrc.push(reader.result);
        };
        await reader.readAsDataURL(file);
      }
      console.log(this.imagesSrc);
    }
  }
}
