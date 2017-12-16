import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';


@Injectable()
export class SessionService implements HttpInterceptor {
  constructor(private injector: Injector) {
    // I intentionally didn't inject AuthService, cause it will cause cyclic dependency error.
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get AuthService via injector
    const auth = this.injector.get(AuthService);

    console.log('new request', req.url, req.body, auth.sessionId);

    let options;

    if (auth.sessionId) {
      options = {headers: req.headers.set('api-session', auth.sessionId)};
    }

    const newRequest = req.clone(options);

    return next.handle(newRequest);
  }
}
