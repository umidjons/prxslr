import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'prx-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  signOut() {
    this.auth.signOut().subscribe((resp: boolean) => {
      if (resp === true) {
        this.router.navigate(['/']);
      }
    });
  }

}
