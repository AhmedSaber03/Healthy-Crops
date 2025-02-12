import { Component, ViewEncapsulation, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../home-page/navbar/navbar.component';
import { CoverpicComponent } from "../coverpic/coverpic.component";
import { FooterComponent } from "../home-page/footer/footer.component";
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { HttpClient } from '@angular/common/http';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzImageModule } from 'ng-zorro-antd/image';
import { FormsModule } from '@angular/forms';
import { tuple } from 'ng-zorro-antd/core/types';
@Component({
  selector: 'app-sub-products',
  standalone: true,
  imports: [
    NavbarComponent, FooterComponent, CoverpicComponent,
    NzTabsModule, CommonModule, TranslateModule, RouterModule, NzPaginationModule, NzSkeletonModule, FormsModule,NzImageModule
  ],
  templateUrl: './sub-products.component.html',
  styleUrl: './sub-products.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SubProductsComponent implements OnInit {
  
  private http = inject(HttpClient);

  products: any[] = [];
  category: any[] = [];
  // filteredProducts: any[] = [];
  tabs: { titleKey: string; id: number }[] = [];
  selectedTab = 0;
  pageIndex = 1;
  pageSize = 6;
  totalProducts = 0;
  isLoadingTabs = true;
  isLoadingProducts = true;
  currentCategoryId: number | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    this.getCategory();
  }
  getCategory() {
    this.isLoadingTabs = true;
    this.http.get<{ data: any[] }>("categories").subscribe({
      next: (response) => {
        this.category = response.data;
        this.tabs = this.category.map(cat => ({
          titleKey: cat.name,
          id: cat.id 
        }));
        this.isLoadingTabs = false;
        if (this.tabs.length > 0) {
          this.currentCategoryId = this.tabs[0].id;
          this.getProducts();
        }
      },
      error: (error: any) => {
        this.isLoadingTabs = false;
      },
    });
  }
  getProducts() {
    this.isLoadingProducts = true;
    if (this.currentCategoryId === null) return;
    const body = { category_id: this.currentCategoryId, page: this.pageIndex };
    this.http.post<{ pagination: { total: number }, data: any[] }>('products', body).subscribe({
      next: (response) => {
        this.isLoadingProducts = false;
        console.log('Products API Response:', response);
        if (response && response.data.length > 0) {
          this.products = response.data;
          this.totalProducts = response.pagination.total || 0;
        } else {
          console.warn('No products found for category:', this.currentCategoryId);
          this.products = [];
          this.totalProducts = 0;
        }
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.isLoadingProducts = false;
      },
    });
  }

  onTabChange(index: number): void {
    this.selectedTab = index;
    this.pageIndex = 1;
    if (this.tabs[index]) {
      this.currentCategoryId = this.tabs[index].id; 
      this.getProducts();
    }
  }
  onPageIndexChange(page: number): void {
    this.pageIndex = page;
    this.getProducts(); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }  

  loadPageData(): void {
    const start = (this.pageIndex - 1) * this.pageSize;
    const end = start + this.pageSize;
  }
  logClick(product: any): void {
    this.router.navigate(['/product-details', product.id]);
  }
}
