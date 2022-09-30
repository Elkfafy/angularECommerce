import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productData: Product = {
    title: '',
    price: 0,
    desc: '',
    category: '',
    thumnail: null,
    images: null,
    imagesArr: [],
    thumnailImage: null,
  };
  categories : any
  errMessage: string = '';
  thumnailSrc: any;
  imagesSrc: any = [];
  canExit: boolean = false
  productId = this.activated.snapshot.paramMap.get('id')
  constructor(
    private global: GlobalService,
    private router: Router,
    private toastr: ToastrService,
    private activated: ActivatedRoute
  ) {
    this.global.getSingleProduct(this.productId).subscribe((res: any) => {
      this.productData = res.data
      this.thumnailSrc = `${this.global.backendUrl}${this.productData.thumnail}`
      this.productData.images.forEach((image:any) => {
        this.imagesSrc.push(`${this.global.backendUrl}${image}`)
      })
    }, (e) => {console.log(e)})
    this.global.getCategories(0, 9999).subscribe((res:any) => {
      this.categories = res.data.categories
    }, (e:any) => console.log(e))
  }

  ngOnInit(): void {}

  editProduct(addProductForm: any) {
    if (addProductForm.valid) {

      const formData = new FormData;
      const container:any = {...this.productData}
      delete container.consumers
      Object.keys(container).forEach((key: any) => {
        if (key =='imagesArr') {
          for(let image of container.imagesArr) {

            formData.append('imagesArr', image)
          }
        }
        else formData.append(key, container[key])
      })
      this.global.editProduct(this.productId, formData).subscribe((res: any) => {
        this.toastr.success('product added')
        this.canExit = true
        this.router.navigateByUrl('/products')
      }, (e) => {
        console.log(e)
        this.toastr.error('Server Error')
      })
    }
  }

  createImgUrl(ele: any) {
    if (ele.files[0]) {
      this.productData.thumnailImage = ele.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.thumnailSrc = reader.result;
      };
      reader.readAsDataURL(ele.files[0]);
      console.log(this.productData);
    }
  }
  createImgsUrl(ele: any) {
    if (ele.files[0]) {
      this.imagesSrc = [];
      this.productData.imagesArr = ele.files;
      for (let file of ele.files) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagesSrc.push(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

}
