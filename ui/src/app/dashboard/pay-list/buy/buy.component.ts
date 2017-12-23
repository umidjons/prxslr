import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProxyService } from '../../../services/proxy.service';
import { CountryService } from '../../../services/country.service';
import { ProductService } from '../../../services/product.service';
import * as _ from 'lodash';

@Component({
  selector: 'prx-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {

  public proxyTypes;
  public countries;
  public periods;
  public protocols;
  public products;
  public filteredProducts;
  public selectedProducts;
  public filter: FormGroup;
  public order: FormGroup;

  constructor(private proxyService: ProxyService,
              private countryService: CountryService,
              private productService: ProductService,
              private fb: FormBuilder) {
    this.order = this.fb.group({
      count: [0, [Validators.required]],
      price: [0, [Validators.required]],
      items: this.fb.array([])
    });

    this.order.valueChanges.subscribe(value => {
      console.log(value);

      let count = 0;
      let price = 0;

      for (let item of value.items) {
        const duration = this.durationById(item.duration);
        count += item.count;
        item.totalPrice = duration.factor * item.count * item.product.price;
        price += item.totalPrice;
      }

      this.order.controls.count.setValue(count, {emitEvent: false});
      this.order.controls.price.setValue(price, {emitEvent: false});
    });

    this.filter = this.fb.group({
      type: ['', [Validators.required]],
      country_id: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      protocols: ['', [Validators.required]],
      count: [1, [Validators.required]],
    });

    this.filter.valueChanges.subscribe(value => {
      this.filteredProducts = this.products.filter((product) => {
        let satisfy = false;

        const _type = value.type ? product.type == value.type : true;
        const _country = value.country_id ? product.country_id == value.country_id : true;
        const _protocol = value.protocols.length ? product.protocols.includes(value.protocols) : true;
        satisfy = _type && _country && _protocol;

        return satisfy;
      });
    });
  }

  ngOnInit() {
    this.proxyTypes = this.proxyService.types();
    this.periods = this.proxyService.periods();
    this.protocols = this.proxyService.protocols();
    this.countryService.list().subscribe((countries) => {
      this.countries = countries;
    });
    this.productService.list().subscribe((products) => {
      this.products = products;
    });
  }

  addToCart(product) {
    const items = <FormArray>this.order.controls['items'];
    items.push(this.fb.group({
      product: product,
      count: 1,
      duration: 30,
      price: product.price,
      totalPrice: product.price
    }));
  }

  submitOrder() {

  }

  countryById(id) {
    return _.find(this.countries, {_id: id});
  }

  durationById(id) {
    return _.find(this.periods, {_id: 1 * id});
  }

}
