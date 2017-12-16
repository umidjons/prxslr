import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'prx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  isAuthorized() {
    return this.auth.isAuthorized();
  }
}
