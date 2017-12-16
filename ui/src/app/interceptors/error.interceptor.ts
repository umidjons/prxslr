import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { ToastsManager } from 'ng2-toastr';

@Injectable()
export class ErrorService implements HttpInterceptor {

  constructor(public toastr: ToastsManager) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .do(
        (event: any) => {
          if (event instanceof HttpResponse) {
            const error = event.body.error;
            if (error && error.message) {
              let msg = error.message;

              if (error.code) {
                msg = `${error.code} - ${error.message}`;
              }

              if (error.data) {
                msg = `${error.code} - ${error.message} ('${error.data}')`;
              }

              // TODO: disable toastr by request/on demand
              this.toastr.error(msg, 'Error');
            }
          }
        },
        (error: any) => {
          console.error('ErrorService error:', error);
          if (error instanceof HttpErrorResponse) {
            if (error.message) {
              return this.toastr.error(error.message, 'System Error');
            }
          }
        });
  }

}
