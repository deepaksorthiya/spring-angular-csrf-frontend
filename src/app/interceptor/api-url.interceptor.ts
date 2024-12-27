import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpXsrfTokenExtractor,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {
  private apiUrl = environment.apiUrl;
  constructor(
    private router: Router,
    private httpXsrfTokenExtractor: HttpXsrfTokenExtractor
  ) {}

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
    console.log('XSRF TOKEN: ' + this.httpXsrfTokenExtractor.getToken());
    if (req.url.startsWith('/assets')) {
      return next.handle(req);
    }
    //const apiUrl = 'http://localhost:8080';
    const request = req.clone({
      //url: apiUrl + req.url,
      withCredentials: true, // Needed since we are using Session Cookies
    });

    return next
      .handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleErrorRes(error))
      );
  }

  private handleErrorRes(error: HttpErrorResponse): Observable<never> {
    switch (error.status) {
      case 401:
        this.router.navigateByUrl('/login', { replaceUrl: true });
        break;
    }
    return throwError(() => error);
  }
}
