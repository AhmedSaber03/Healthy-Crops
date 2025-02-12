import { Component, ViewEncapsulation, OnInit, inject  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../../home-page/navbar/navbar.component';
import { CoverpicComponent } from "../../coverpic/coverpic.component"
import { FooterComponent } from "../../home-page/footer/footer.component";
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/shared.service';
import { HttpClient } from '@angular/common/http';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzImageModule } from 'ng-zorro-antd/image';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NavbarComponent,CoverpicComponent, FooterComponent, TranslateModule, CommonModule, RouterModule, NzSkeletonModule, NzImageModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProductDetailsComponent implements OnInit {

  private http = inject(HttpClient);
  product: any;
  productId: number = 0;
  productBgUrl: string = '';
  pageTitle: string = '';
  descriptions: string = '';

  isLoadingProducts = true;

  constructor(  
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = Number(params.get('id'));
      if (this.productId) {
        this.getProductDetails();
      }
    });
  }


  getProductDetails() {
    this.isLoadingProducts = true;
    this.http.get<{ data: any}>(`products/${this.productId}`).subscribe({
      next: (response) => {
        console.log('Products API Response:', response);
        if (response && response.data) {
          this.isLoadingProducts = false;
          this.product = response.data;
          this.productBgUrl = this.product.inner_image;
          this.pageTitle = this.product.name; 
          this.descriptions = this.product.descriptions;
        }
      },
      error: (error) => {
        console.error('Error fetching product:', error);
        this.isLoadingProducts = false;
      }
    });
  }

  backToProducts(): void {
    this.router.navigate(['/products']);
  }
}
