import { Component, ViewEncapsulation } from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NzTabsModule, CarouselModule, CommonModule, TranslateModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductsComponent {
  selectedTab = 0;

  tabs = [
    {
      titleKey: 'PRODUCTS.TABS.FROZEN',
      slides: [
        { image: '/assets/pic/ginger.jpg', titleKey: 'PRODUCTS.SLIDES.GINGER' },
        { image: '/assets/pic/ginger.jpg', titleKey: 'PRODUCTS.SLIDES.GINGER' },
        { image: '/assets/pic/ginger.jpg', titleKey: 'PRODUCTS.SLIDES.GINGER' },
        { image: '/assets/pic/ginger.jpg', titleKey: 'PRODUCTS.SLIDES.GINGER' },
      ],
    },
    { 
      titleKey: 'PRODUCTS.TABS.FRESH',
      slides: [
        { image: '/assets/pic/products/product1.png', titleKey: 'PRODUCTS.SLIDES.TOMATO' },
        { image: '/assets/pic/products/product2.png', titleKey: 'PRODUCTS.SLIDES.CUCUMBER' },
        { image: '/assets/pic/products/product3.png', titleKey: 'PRODUCTS.SLIDES.ONION' },
        { image: '/assets/pic/products/product4.png', titleKey: 'PRODUCTS.SLIDES.colorpepper' },
      ],
    },
    {
      titleKey: 'PRODUCTS.TABS.DEHYDRATED',
      slides: [
        { image: '/assets/pic/chili.jpg', titleKey: 'PRODUCTS.SLIDES.CHILI' },
        { image: '/assets/pic/chili.jpg', titleKey: 'PRODUCTS.SLIDES.CHILI' },
        { image: '/assets/pic/chili.jpg', titleKey: 'PRODUCTS.SLIDES.CHILI' },
        { image: '/assets/pic/chili.jpg', titleKey: 'PRODUCTS.SLIDES.CHILI' },
      ],
    },
  ];

  sliderOptions: OwlOptions = {
    loop: true,
    rtl: true,
    margin: 10,
    nav: true,
    navText: ['<img src="assets/pic/arrow-left-short.svg" alt="Previous">',
              '<img src="assets/pic/arrow-left-short.svg" alt="Next">'], 
    dots: false,
    items: 4, 
    slideBy: 1,
    autoplay: true,
    autoplayTimeout: 3500,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1, 
      },
      600: {
        items: 2, 
      },
      900: {
        items: 2,
      },
      1000: {
        items: 4,
      },
    },
  };
  

  onTabChange(index: number): void {
    this.selectedTab = index;
  }
}
