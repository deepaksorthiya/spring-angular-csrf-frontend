import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpXsrfTokenExtractor,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CustomCsrfInterceptor implements HttpInterceptor {
  constructor(private httpXsrfTokenExtractor: HttpXsrfTokenExtractor) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(
      'Request URL: ' +
        req.url +
        '  Request Method: ' +
        req.method +
        ' Request Headers: ' +
        req.headers.keys()
    );
    const csrfToken = this.httpXsrfTokenExtractor.getToken();
    console.log('XSRF TOKEN: ', csrfToken);
    if (req.url.startsWith('/assets')) {
      return next.handle(req);
    }

    // Needed since we are using Session Cookies
    let request = req.clone({
      withCredentials: true,
    });

    const cookieheaderName = 'X-XSRF-TOKEN';
    if (csrfToken !== null && !req.headers.has(cookieheaderName)) {
      request = request.clone({
        headers: request.headers.set(cookieheaderName, csrfToken),
      });
    }
    return next.handle(request);
  }
}
