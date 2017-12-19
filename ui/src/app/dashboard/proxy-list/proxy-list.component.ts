import { Component, OnInit } from '@angular/core';
import { ProxyService } from '../../services/proxy.service';

@Component({
  selector: 'prx-proxy-list',
  templateUrl: './proxy-list.component.html',
  styleUrls: ['./proxy-list.component.scss']
})
export class ProxyListComponent implements OnInit {

  public proxies = [];

  constructor(private proxyService: ProxyService) { }

  ngOnInit() {
    this.proxyService.list().subscribe((items) => {
      console.log('items=', items);
      this.proxies = items;
    });
  }

}
