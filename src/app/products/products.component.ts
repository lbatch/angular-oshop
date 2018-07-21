import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnDestroy {
  products: Product[];
  filteredProducts: Product[];
  category: string;
  subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService) {

    this.subscription = route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      productService.getAll().pipe(
        map(products => {
          return products.map(product => <Product>({key: product.key, value: product.payload.val()}));
        })
      ).subscribe(products => {
        this.products = products;
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.value.category === this.category) :
          this.products;
    });
  });
}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
