import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CookieService, UnmanagedCookie, Cookie } from 'ng2-cookies';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private cookie: CookieService) {
  }

  signIn(email, password): Observable<any> {
    return this.http.post(environment.backend_url + 'sign-in', {email, password}, {observe: 'response'}).pipe(
      map((resp: any) => {
        console.log('signIn() resp=', resp);
        console.log('signIn() headers=', resp.headers.cookie);
        if (resp.body.success === true && resp.body.sid) {
          this.setSession(resp.body.sid, resp.body.user);
        }

        return resp.body;
      })
    );
  }

  signUp(email, password): Observable<any> {
    return this.http.post(environment.backend_url + 'sign-up', {email, password}).pipe(
      map((resp: any) => {
        console.log('signUp() resp=', resp);
        return resp;
      })
    );
  }

  signOut(): Observable<boolean> {
    return this.http.post(environment.backend_url + 'sign-out', null).pipe(
      map((resp: any) => {
        console.log('signOut() resp=', resp);

        if (resp.success === true) {
          this.removeSession();
          return true;
        }

        return false;
      })
    );
  }

  private removeSession() {
    localStorage.removeItem('sid');
    localStorage.removeItem('user');
    // todo: Do not know why cookie is not deleting
    this.cookie.delete('connect.sid');
    Cookie.deleteAll();
    UnmanagedCookie.deleteAll();
  }

  private setSession(id: string, user: any) {
    localStorage.setItem('sid', id);
    localStorage.setItem('user', JSON.stringify(user));
  }

  get sessionId(): string {
    return localStorage.getItem('sid');
  }

  get user() {
    return JSON.parse(localStorage.getItem('user'));
  }

  public isAuthorized() {
    return !!this.sessionId;
  }

}
