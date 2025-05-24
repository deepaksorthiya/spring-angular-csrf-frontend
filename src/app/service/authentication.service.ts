import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean | null>(null);
  private currentUserSubject = new BehaviorSubject<any | null>(null);
  constructor(private http: HttpClient) {}

  checkAuthentication(): Observable<void> {
    return this.me();
  }

  me(): Observable<any> {
    return this.http
      .get<any>(environment.apiUrl + '/api/user/me')
      .pipe(
        tap({
          next: (user) => {
            this.isAuthenticatedSubject.next(true);
            this.currentUserSubject.next(user);
          },
        })
      )
      .pipe(
        catchError((error) => {
          // Handle the error here
          console.error('ERROR from CatchERROR :: ', error);
          this.isAuthenticatedSubject.next(false);
          this.currentUserSubject.next(null);
          return of(null);
        })
      );
  }

  login(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    return this.http
      .post<void>(environment.apiUrl + '/api/login', params, { headers })
      .pipe(switchMap(() => this.me()));
  }

  performPostRequest() {
    return this.http.post(environment.apiUrl + '/api/post', {});
  }

  getBackendServerInfo() {
    return this.http.get(environment.apiUrl + '/api/server-info');
  }

  logout(): Observable<void> {
    return this.http.post<void>(environment.apiUrl + '/api/logout', {}).pipe(
      tap({
        next: () => this.isAuthenticatedSubject.next(false),
      })
    );
  }

  get isAuthenticated(): Observable<boolean | null> {
    return this.isAuthenticatedSubject.asObservable();
  }

  get currentUser(): Observable<any | null> {
    return this.currentUserSubject.asObservable();
  }
}
