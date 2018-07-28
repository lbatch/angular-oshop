import { ShoppingCart } from './../models/shopping-cart';
import { OrderService } from './../order.service';
import { AuthService } from './../auth.service';
import { ShoppingCartService } from './../shopping-cart.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Order } from '../models/order';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping: {} = {};
  userId: string;
  userSubscription: Subscription;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router) {}

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

}
