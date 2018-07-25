import { ShoppingCartService } from './../shopping-cart.service';
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

export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: Product[];
  category: string;
  subscription: Subscription;
  cartSubscription: Subscription;
  cartObj: any;
  cart: any;
  cartSnapshot: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService) {}

  async ngOnInit() {
    this.subscription = this.route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.productService.getAll().pipe(
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

    this.cartObj = await this.shoppingCartService.getCart();
    this.cartSubscription = this.cartObj.snapshotChanges().subscribe(c => {
      this.cart = c;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.cartSubscription.unsubscribe();
  }
}
