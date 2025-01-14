import { Component, OnInit, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, TranslateModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {  // Implement OnInit lifecycle
  title = 'Healthy_Crops';
  
  showScrollToTop = false;

  constructor(private translate: TranslateService, private router: Router) {
    // Initialize TranslateService
    this.translate.setDefaultLang('en'); // Set the default language to English
    this.translate.use('en'); // Set initial language (this will be overwritten in ngOnInit)
  }

  ngOnInit(): void {
    // Set saved language on app load
    const savedLanguage = localStorage.getItem('language') || 'en';
    this.translate.use(savedLanguage);
    document.documentElement.lang = savedLanguage;
    document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';

    // Listen to route change events and scroll to top
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('NavigationEnd Event:', event.urlAfterRedirects); 
        console.log('Current scroll position:', window.scrollY);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  onActivate(): void {
    console.log('Route activated');
    setTimeout(() => {
      window.scrollTo({ top: 0});
    }, 0);
  }

  // Detect scroll and show/hide the "scroll to top" button
  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showScrollToTop = scrollPosition > 1000;
  }

  // Scroll to the top of the page
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
