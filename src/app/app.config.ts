import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';  // Required for HttpClient
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';  // Import TranslateModule
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';  // Import the HTTP Loader
import { APP_INITIALIZER, Provider } from '@angular/core';

export function appInitializerFactory(translate: TranslateService): () => void {
  return () => {
    const savedLanguage = localStorage.getItem('language') || 'en'; // Default to English if no language is saved
    translate.use(savedLanguage); // Set the language for ngx-translate
    document.documentElement.lang = savedLanguage; // Set the HTML language attribute
    document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr'; // Set the direction
  };
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');  // Path where translations will be
}

export function appLanguageInitializer(translate: TranslateService): () => Promise<void> {
  return () =>
    new Promise<void>((resolve) => {
      const savedLanguage = localStorage.getItem('language') || 'en'; // Default to English
      translate.use(savedLanguage).subscribe(() => {
        document.documentElement.lang = savedLanguage;
        document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
        resolve();
      });
    });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNzI18n(en_US),
    provideAnimationsAsync(),
    importProvidersFrom(
      HttpClientModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
        defaultLanguage: 'en', // Default language
      })
    ),
  ]
};

export const appInitializerProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: appInitializerFactory,
  deps: [TranslateService],
  multi: true,
};
