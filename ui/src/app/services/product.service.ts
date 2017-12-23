import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get(environment.backend_url + 'products').pipe(
      map((resp) => {
        if (resp['success'] === true) {
          return resp['result'];
        }

        return null;
      })
    );
  }

}
