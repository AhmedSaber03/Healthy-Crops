import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { RouterModule, Routes } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';  // Import TranslateModule
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
    NzDrawerModule,
    TranslateModule,
    FormsModule,
    NzSelectModule,
    ReactiveFormsModule,
    OverlayModule

  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class NavbarComponent {
  
  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  selectedLanguage: string = 'en';  // Default language
  languages = [
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية' }
  ];

  constructor(private translate: TranslateService) {}

  switchLanguage(language: string): void {
    this.translate.use(language);  // Switch language
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }
}