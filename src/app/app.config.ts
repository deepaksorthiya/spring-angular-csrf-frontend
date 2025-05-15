import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { routes } from './app.routes';
import { ApiUrlInterceptor } from './interceptor/api-url.interceptor';
import { LogCsrfInterceptor } from './interceptor/log-csrf.interceptor';
import { AuthenticationService } from './service/authentication.service';

export const appConfig: ApplicationConfig = {
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: checkAuthentication,
    //   deps: [AuthenticationService],
    //   multi: true,
    // },
    // provideAppInitializer(() => {
    //   const initializerFn = ((service: AuthenticationService) => {
    //     return () => service.checkAuthentication();
    //   })(inject(AuthenticationService));
    //   return initializerFn();
    // }),
    provideAppInitializer(() => {
      return inject(AuthenticationService).checkAuthentication();
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LogCsrfInterceptor,
      multi: true,
    },
  ],
};
