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
export class LogCsrfInterceptor implements HttpInterceptor {
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
    return next.handle(req);
  }
}
