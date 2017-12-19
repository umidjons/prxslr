import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class ProxyService {

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get(environment.backend_url + 'proxies').pipe(
      map((resp) => {
        if (resp['success'] === true) {
          return resp['result'];
        }

        return null;
      })
    );
  }
}
