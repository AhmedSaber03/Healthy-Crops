import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../app/environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  // Skip the interceptor for translation files
  if (req.url.startsWith('/assets/i18n/')) {
    return next(req);  // Let these requests pass through as they are
  }
  const lang = localStorage.getItem('language') || 'en';  
  

  // For other API requests, you can modify them as needed
  const token = localStorage.getItem('authToken');
  const modifiedReq = req.clone({
    url: `${environment.apiUrl}${req.url}`, // Append base API URL
    setHeaders: {
      'lang': lang, 
      'Content-Type': 'application/json',
    },
  });

  return next(modifiedReq);  
};
