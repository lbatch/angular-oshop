import { ShoppingCart } from './../models/shopping-cart';
import { map } from 'rxjs/operators';
import { Product } from './../models/product';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cart$: Observable<ShoppingCart>;
  cart: ShoppingCart;
  subscription: Subscription;
  displayedColumns: string[] = ['thumbnail', 'title', 'quantity', 'pad', 'total-price'];

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.subscription = this.cart$.subscribe(c => {
      this.cart = c;
      console.log(this.cart);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  clearCart() {
    this.shoppingCartService.clearCart();
  }
}
