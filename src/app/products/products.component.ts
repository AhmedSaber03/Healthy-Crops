import { Component, ViewEncapsulation } from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NzTabsModule, CarouselModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductsComponent {
  selectedTab = 0;

  tabs = [
    {
      title: 'Frozen',
      slides: [
        { image: '/assets/pic/ginger.jpg', title: 'Ginger' },
        { image: '/assets/pic/ginger.jpg', title: 'Ginger' },
        { image: '/assets/pic/ginger.jpg', title: 'Ginger' },
        { image: '/assets/pic/ginger.jpg', title: 'Ginger' },
        { image: '/assets/pic/ginger.jpg', title: 'Ginger' },
      ],
    },
    {
      title: 'Fresh',
      slides: [
        { image: '/assets/pic/tomato.png', title: 'Tomato' },
        { image: '/assets/pic/cucumber.png', title: 'cucumber' },
        { image: '/assets/pic/onion.png', title: 'onion' },
        { image: '/assets/pic/color_pepper.png', title: 'color_peppe' },
        { image: '/assets/pic/pepper.png', title: 'Pepper' },
      ],
    },
    {
      title: 'Dehydrated',
      slides: [
        { image: '/assets/pic/chili.jpg', title: 'Chili' },
        { image: '/assets/pic/chili.jpg', title: 'Chili' },
        { image: '/assets/pic/chili.jpg', title: 'Chili' },
        { image: '/assets/pic/chili.jpg', title: 'Chili' },
        { image: '/assets/pic/chili.jpg', title: 'Chili' },
      ],
    },
  ];

  sliderOptions: OwlOptions = {
    loop: true,
    margin: 10,
    nav: true,
    navText: ['<img src="assets/pic/arrow-left-short.svg" alt="Previous">',
              '<img src="assets/pic/arrow-left-short.svg" alt="Next">'], 
    dots: false,
    items: 4, 
    slideBy: 1,
    autoplay: false,
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
        items: 3,
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
