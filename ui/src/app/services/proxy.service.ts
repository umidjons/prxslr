import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class ProxyService {

  constructor(private http: HttpClient) { }

  types() {
    return [
      {_id: 'ipv6', title: 'IPv6'},
      {_id: 'ipv4', title: 'IPv4'},
      {_id: 'ipv4_shared', title: 'IPv4 Shared'},
    ];
  }

  periods() {
    return [
      {_id: 30, title: '1 месяц', factor: 1},
      {_id: 60, title: '2 месяц', factor: 2},
      {_id: 90, title: '3 месяц', factor: 3},
    ];
  }

  protocols() {
    return [
      {_id: 'http', title: 'HTTP'},
      {_id: 'https', title: 'HTTPS'},
      {_id: 'socks', title: 'SOCKS'},
    ];
  }

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
