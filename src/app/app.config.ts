import {
  APP_INITIALIZER,
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
  withXsrfConfiguration,
} from '@angular/common/http';
import { AuthenticationService } from './service/authentication.service';
import { catchError, Observable, of } from 'rxjs';
import { ApiUrlInterceptor } from './interceptor/api-url.interceptor';

function checkAuthentication(
  authService: AuthenticationService
): () => Observable<any> {
  return () =>
    authService.checkAuthentication().pipe(catchError((err) => of(null)));
}

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: checkAuthentication,
      deps: [AuthenticationService],
      multi: true,
    },
    // provideAppInitializer(() => {
    //   const initializerFn = ((service: AuthenticationService) => {
    //     return () => service.checkAuthentication();
    //   })(inject(AuthenticationService));
    //   return initializerFn();
    // }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi(), withXsrfConfiguration({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    })),
    { provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true },
  ],
};
