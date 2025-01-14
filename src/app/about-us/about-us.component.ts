import { Component,ViewEncapsulation, ViewChild  } from '@angular/core';
import { NavbarComponent } from '../home-page/navbar/navbar.component';
import { CoverpicComponent } from '../coverpic/coverpic.component';
import { FooterComponent } from "../home-page/footer/footer.component";
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { CommonModule } from '@angular/common';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';




@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [TranslateModule, NavbarComponent, FooterComponent, CoverpicComponent, NzTabsModule, CommonModule, NzCarouselModule, NzCarouselComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AboutUsComponent {
  
  selectedTab = 0;

  tabs = [
    {
      titleKey: 'SUBPRODUCTS.HPP',
      content: 'SUBPRODUCTS.content1',
      description: 'SUBPRODUCTS.description1',
      imageUrl: 'assets/pic/HPPTechnology.png',
    },
    {
      titleKey: 'SUBPRODUCTS.IQF',
      content: 'SUBPRODUCTS.content2',
      description: 'SUBPRODUCTS.description2',
      imageUrl: 'assets/pic/highQualityMainPage.png',
    },
    {
      titleKey: 'SUBPRODUCTS.Freeze',
      content: 'SUBPRODUCTS.content3',
      description: 'SUBPRODUCTS.description3',
      imageUrl: 'assets/pic/fertilizers.png',
    },
  ];

  onTabChange(index: number): void {
    this.selectedTab = index;
  }
  
  @ViewChild('carousel', { static: true }) carousel!: NzCarouselComponent;
  effect = 'scrollx';
  slides = [
    { imgSrc: 'assets/pic/Group5350.png' },
    { imgSrc: 'assets/pic/Group5350.png' },
    { imgSrc: 'assets/pic/Group5350.png' }
  ];
  currentSlideIndex = 0;

  onSlideChange(event: number): void {
    this.currentSlideIndex = event;
  }
    prev(): void {
    this.carousel.pre();
  }

  next(): void {
    this.carousel.next();
  }
}