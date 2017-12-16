import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from "ng2-toastr";

@Component({
  selector: 'prx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'prx';

  constructor(public toastr: ToastsManager, private vcr: ViewContainerRef) {}

  ngOnInit() {
    // this toastr configuration will be applied to all children too
    this.toastr.setRootViewContainerRef(this.vcr);
  }
}
