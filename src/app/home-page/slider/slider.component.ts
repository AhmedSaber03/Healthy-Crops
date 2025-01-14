import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [
    CommonModule,
    NzCarouselModule,
    TranslateModule
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class SliderComponent {
      effect = 'scrollx';
      slides = [
        {
          imgSrc: 'assets/pic/BK.jpg',
          titleKey: 'SLIDER.SLIDE_1.TITLE',
          subtitleKey: 'SLIDER.SLIDE_1.SUBTITLE',
          descriptionKey: 'SLIDER.SLIDE_1.DESCRIPTION',
          button1Key: 'SLIDER.SLIDE_1.BUTTON_1',
          button2Key: 'SLIDER.SLIDE_1.BUTTON_2',
        },
        {
          imgSrc: 'assets/pic/bk-bk.jpg',
          titleKey: 'SLIDER.SLIDE_2.TITLE',
          subtitleKey: 'SLIDER.SLIDE_2.SUBTITLE',
          descriptionKey: 'SLIDER.SLIDE_2.DESCRIPTION',
          button1Key: 'SLIDER.SLIDE_2.BUTTON_1',
          button2Key: 'SLIDER.SLIDE_2.BUTTON_2',
        },
        { 
          imgSrc: 'assets/pic/BK3.jpg',
          titleKey: 'SLIDER.SLIDE_3.TITLE',
          subtitleKey: 'SLIDER.SLIDE_3.SUBTITLE',
          descriptionKey: 'SLIDER.SLIDE_3.DESCRIPTION',
          button1Key: 'SLIDER.SLIDE_3.BUTTON_1',
          button2Key: 'SLIDER.SLIDE_3.BUTTON_2',
        },
      ]; 
}
