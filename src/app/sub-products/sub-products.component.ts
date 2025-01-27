import { Component, ViewEncapsulation, OnInit  } from '@angular/core';
import { NavbarComponent } from '../home-page/navbar/navbar.component';
import { CoverpicComponent } from "../coverpic/coverpic.component";
import { FooterComponent } from "../home-page/footer/footer.component";
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { ProductService } from '../services/shared.service'; 



@Component({
  selector: 'app-sub-products',
  standalone: true,
  imports: [NavbarComponent, FooterComponent,
     CoverpicComponent, NzTabsModule, CommonModule,
      TranslateModule, RouterModule, NzPaginationModule],
  templateUrl: './sub-products.component.html',
  styleUrl: './sub-products.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SubProductsComponent implements OnInit {
  selectedTab = 0;
  currentPage = 1;
  pageSize = 6;
  totalProducts = 0;

  tabs = [
    { titleKey: 'PRODUCTS.TABS.FROZEN', type: 'FROZEN' },
    { titleKey: 'PRODUCTS.TABS.FRESH', type: 'FRESH' },
    { titleKey: 'PRODUCTS.TABS.DEHYDRATED', type: 'DEHYDRATED' },
  ];
  products: any[] = [];
  filteredProducts: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const tabType = params['type'];
      if (tabType) {
        const tabIndex = this.tabs.findIndex((tab) => tab.type === tabType);
        if (tabIndex !== -1) {
          this.selectedTab = tabIndex;
          this.filterProducts();
        }
      }
    });

    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.filterProducts();
      },
      (error) => console.error('Error fetching products:', error)
    );
  }

  filterProducts(): void {
    const tabType = this.tabs[this.selectedTab]?.type;
    const filtered = this.products.filter((product) => product.type === tabType);

    this.totalProducts = filtered.length;

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredProducts = filtered.slice(startIndex, endIndex);

    const tabContent = document.querySelector('.tabContent');
    if (tabContent) {
      if (this.filteredProducts.length % 3 != 0) {
        tabContent.classList.add('flex-start');
      } else {
        tabContent.classList.remove('flex-start');
      }
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.filterProducts();
    window.scrollTo({ top: 0, behavior: 'smooth'});
  }
  onTabChange(index: number): void {
    this.selectedTab = index;
    this.currentPage = 1;
    this.filterProducts();
    const selectedTabType = this.tabs[index].type;
    this.router.navigate(['/products', selectedTabType]); 


  }

  logClick(product: any): void {
    this.router.navigate(['/product-details', product.id]);
  }
}