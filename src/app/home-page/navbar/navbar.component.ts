import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { RouterModule, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';  
import { NzSelectModule } from 'ng-zorro-antd/select';  
import { OverlayModule } from '@angular/cdk/overlay';

import {
  FormControl,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
} from "@angular/forms";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    NzIconModule,
    NzButtonModule,
    RouterModule,
    NzDropDownModule,
    TranslateModule,
    FormsModule,
    NzSelectModule,
    ReactiveFormsModule,
    OverlayModule,
    NzDrawerModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'], // Renamed styleUrl to styleUrls
  encapsulation: ViewEncapsulation.None
})

export class NavbarComponent implements OnInit {
  
  visible = false;
  currentLanguage: string = 'en'; 
  selectedLanguage: any;

  language = [
    { code: 'en', label: 'English', flag: './assets/pic/circle.png' },
    { code: 'ar', label: 'عربي', flag: './assets/pic/egypt.png' },
  ];

  isProductsActive(): boolean {
    return (
      this.router.url.startsWith('/products') ||
      this.router.url.startsWith('/product-details')
    );
  }
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  constructor(private translate: TranslateService, private router: Router) {
    this.currentLanguage = localStorage.getItem('language') || 'en'; 
    this.translate.use(this.currentLanguage);
  }

  ngOnInit(): void {
    this.currentLanguage = localStorage.getItem('language') || 'en';
    console.log('Initial language:', this.currentLanguage)
    document.body.classList.remove('rtl','ltr')
    document.body.classList.add(this.currentLanguage === 'ar' ? 'rtl' : 'ltr')
    }

  switchLanguage(language: string): void {
    this.translate.use(language);  
    localStorage.setItem('language', language);
    const savedLanguage = localStorage.getItem('language');
    console.log('Language saved in localStorage:', savedLanguage);  
    document.documentElement.lang = language;      
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';  
    document.body.classList.remove('rtl','ltr')
    document.body.classList.add(this.currentLanguage === 'ar' ? 'rtl' : 'ltr')
    this.currentLanguage = language;  
    window.location.reload();
  }
  // Added a new method to handle language change event
  onLanguageChange(language: string): void {
    this.switchLanguage(language);
  }  
} 