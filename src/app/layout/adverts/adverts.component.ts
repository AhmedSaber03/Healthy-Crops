import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-adverts',
  standalone: true,
  imports: [CommonModule, NzLayoutModule, NzTabsModule, RouterModule,],
  templateUrl: './adverts.component.html',
  styleUrl: './adverts.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AdvertsComponent {
  
}