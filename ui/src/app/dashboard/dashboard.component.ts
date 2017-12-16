import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Component({
  selector: 'prx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(environment.backend_url + 'restricted').subscribe((resp) => {
      console.log('Restricted: resp=', resp);
    });
  }

}
