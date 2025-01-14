import { Component, ViewEncapsulation, OnInit  } from '@angular/core';
import { NavbarComponent } from '../home-page/navbar/navbar.component';
import { CoverpicComponent } from "../coverpic/coverpic.component";
import { FooterComponent } from "../home-page/footer/footer.component";
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import products from './product-details'; 


@Component({
  selector: 'app-sub-products',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CoverpicComponent, NzTabsModule, CommonModule, TranslateModule, RouterModule],
  templateUrl: './sub-products.component.html',
  styleUrl: './sub-products.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SubProductsComponent implements OnInit {
  selectedTab = 1;

  tabs = [
    {
      titleKey: 'PRODUCTS.TABS.FROZEN',
      slides: [
        { id: 1, image: '/assets/pic/ginger.jpg', titleKey: 'PRODUCTS.SLIDES.GINGER' },
        { id: 1, image: '/assets/pic/ginger.jpg', titleKey: 'PRODUCTS.SLIDES.GINGER' },
        { id: 1, image: '/assets/pic/ginger.jpg', titleKey: 'PRODUCTS.SLIDES.GINGER' },
        { id: 1, image: '/assets/pic/ginger.jpg', titleKey: 'PRODUCTS.SLIDES.GINGER' },
        { id: 1, image: '/assets/pic/ginger.jpg', titleKey: 'PRODUCTS.SLIDES.GINGER' },
        { id: 1, image: '/assets/pic/ginger.jpg', titleKey: 'PRODUCTS.SLIDES.GINGER' },
      ],
    },
    { 
      titleKey: 'PRODUCTS.TABS.FRESH',
      slides: [
        {id: 2, image: '/assets/pic/products/product1.png', titleKey: 'PRODUCTS.SLIDES.TOMATO' },
        {id: 3, image: '/assets/pic/products/product2.png', titleKey: 'PRODUCTS.SLIDES.CUCUMBER' },
        {id: 4, image: '/assets/pic/products/product3.png', titleKey: 'PRODUCTS.SLIDES.ONION' },
        {id: 5, image: '/assets/pic/products/product4.png', titleKey: 'PRODUCTS.SLIDES.colorpepper' },
        {id: 6, image: '/assets/pic/products/product4.png', titleKey: 'PRODUCTS.SLIDES.colorpepper' },
        {id: 7, image: '/assets/pic/products/product4.png', titleKey: 'PRODUCTS.SLIDES.colorpepper' },
      ],
    },
    {
      titleKey: 'PRODUCTS.TABS.DEHYDRATED',
      slides: [
        {id: 8, image: '/assets/pic/chili.jpg', titleKey: 'PRODUCTS.SLIDES.CHILI' },
        {id: 8, image: '/assets/pic/chili.jpg', titleKey: 'PRODUCTS.SLIDES.CHILI' },
        {id: 8, image: '/assets/pic/chili.jpg', titleKey: 'PRODUCTS.SLIDES.CHILI' },
        {id: 8, image: '/assets/pic/chili.jpg', titleKey: 'PRODUCTS.SLIDES.CHILI' },
        {id: 8, image: '/assets/pic/chili.jpg', titleKey: 'PRODUCTS.SLIDES.CHILI' },
        {id: 8, image: '/assets/pic/chili.jpg', titleKey: 'PRODUCTS.SLIDES.CHILI' },
      ],
    },
  ];
  product: any | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const productId = Number(params['id']);
      this.product = products.find((p) => p.id === productId) || null;
      this.product = products.find((prod) => prod.id === productId) || null;
    });
  }

  onTabChange(index: number): void {
    this.selectedTab = index;
  }

  logClick(slide: any) {
    console.log('Clicked slide:', slide);
  }
}
