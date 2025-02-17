import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../app/environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {

  if (req.url.startsWith('assets/') || req.url.startsWith('/assets/i18n/')) {
    return next(req);
  }
  

  const lang = localStorage.getItem('language') || 'en';  
  const token = localStorage.getItem('authToken');
  const modifiedReq = req.clone({
    url: `${environment.apiUrl}${req.url}`,
    setHeaders: {
      'lang': lang, 
      'Content-Type': 'application/json',
    },
  });

  return next(modifiedReq);  
};
