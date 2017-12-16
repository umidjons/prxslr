import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'prx-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  isAuthorized() {
    return this.auth.isAuthorized();
  }
}
