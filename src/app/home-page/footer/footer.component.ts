import { Component, ViewEncapsulation, OnInit  } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { ProductService } from '../../services/shared.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule, RouterModule, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  encapsulation: ViewEncapsulation.None,

})
export class FooterComponent {
  router: any;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute){} 

  tabs = [
    { titleKey: 'PRODUCTS.TABS.FROZEN', type: 'FROZEN' },
    { titleKey: 'PRODUCTS.TABS.FRESH', type: 'FRESH' },
    { titleKey: 'PRODUCTS.TABS.DEHYDRATED', type: 'DEHYDRATED' }
  ];
}

