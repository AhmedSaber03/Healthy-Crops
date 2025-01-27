import { Component, ViewEncapsulation, OnInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../../home-page/navbar/navbar.component';
import { CoverpicComponent } from "../../coverpic/coverpic.component"
import { FooterComponent } from "../../home-page/footer/footer.component";
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/shared.service';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NavbarComponent,CoverpicComponent, FooterComponent, TranslateModule, CommonModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  productId: number= 0; 
  isProductDetails = false;
  productBgUrl: string = '';
  pageTitle: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = Number(params.get('id'));
      if (this.productId) {
        this.productService.getProductById(this.productId).subscribe(
          (product) => {
            this.product = product;
            this.productBgUrl = this.product.productBgUrl;
            this.pageTitle = this.product.titleKey;
          },
          (error) => {
            console.error('Error fetching product:', error);
          }
        );
      }
    });
  }



    // this.route.params.subscribe((params) => {
    //   const productId = Number(params['id']);
    //   this.productService.getProductById(productId).subscribe((product) => {
    //     this.product = product;
    //     if (this.product) {
    //       this.isProductDetails = true;
    //       this.productBgUrl = this.product.productBgUrl;
    //       this.pageTitle = this.product.titleKey;
    //     } else {
    //       this.isProductDetails = true;
    //       console.warn('Product not found for ID:', productId);
    //       alert(`Product with ID ${productId} not found!`);
    //       this.router.navigate(['/products']);
    //     }
    //   });
    // });
  

  backToProducts(): void {
    this.router.navigate(['/products']);
  }
  paragraphs = [
    { text: 'CONTACTUS.TEXT1', img: 'assets/pic/checkmark-filled.png' },
    { text: 'CONTACTUS.TEXT2', img: 'assets/pic/checkmark-filled.png' },
    { text: "CONTACTUS.TEXT3", img: 'assets/pic/checkmark-filled.png' },
    { text: 'CONTACTUS.TEXT4', img: 'assets/pic/checkmark-filled.png' },
    { text: 'CONTACTUS.TEXT5', img: 'assets/pic/checkmark-filled.png' },
    { text: 'CONTACTUS.TEXT6', img: 'assets/pic/checkmark-filled.png' },
    { text: "CONTACTUS.TEXT7", img: 'assets/pic/checkmark-filled.png' },
  ];
}
