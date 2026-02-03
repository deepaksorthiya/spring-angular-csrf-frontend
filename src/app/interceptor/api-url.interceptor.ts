import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.startsWith('/assets')) {
      return next.handle(req);
    }

    req = req.clone({
      withCredentials: true, // Ensure cookies are sent with the each request
    });

    return next
      .handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleErrorRes(error))
      );
  }

  private handleErrorRes(error: HttpErrorResponse): Observable<never> {
    switch (error.status) {
      case 401:
        this.router.navigateByUrl('/login', { replaceUrl: true });
        localStorage.setItem(AuthenticationService.isAuthenticatedKey, 'false');
        break;
    }
    return throwError(() => error);
  }
}
