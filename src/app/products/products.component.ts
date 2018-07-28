import { ShoppingCartService } from './../shopping-cart.service';
import { map } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;
  cart: ShoppingCart;
  subscription: Subscription;
  cartSubscription: Subscription;

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

    this.cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = this.cart$.subscribe(c => {
      this.cart = c;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.cartSubscription.unsubscribe();
  }
}
