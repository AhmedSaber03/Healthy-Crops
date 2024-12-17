import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { TranslateService } from '@ngx-translate/core';
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
        { imgSrc: 'assets/pic/BK.jpg',
          title:"What We Do",
          subtitle: "Premium Quality",
         },
        { imgSrc: 'assets/pic/bk-bk.jpg',
          title:"How We Do it",
          subtitle: "Hard works",
         },
         { imgSrc: 'assets/pic/BK3.jpg',
          title:"How We Do it",
          subtitle: "Hard works",
         },
      ];
}
