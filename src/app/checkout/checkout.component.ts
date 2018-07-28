import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import { map } from 'rxjs/operators';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  cart$: Observable<ShoppingCart>;
  shipping: {} = {};
  cart: ShoppingCart;
  userId: string;

  cartSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService,
    private authService: AuthService) {}

  async ngOnInit() {
    const cart$ = (await this.shoppingCartService.getCart());
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);

    this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  placeOrder() {
    const cartItems = this.cart.items;
    const shipItems = [];
    for (const item in cartItems) {
      if (cartItems[item]) {
        shipItems
        .push({
         product: {
           title: cartItems[item].product.value.title,
           imageUrl: cartItems[item].product.value.imageUrl,
           price: cartItems[item].product.value.price
         },
         quantity: cartItems[item].quantity,
         totalPrice: (cartItems[item].product.value.price * cartItems[item].quantity)
       });
      }
    }

    const order = {
      userId: this.userId,
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: shipItems
    };

    this.orderService.storeOrder(order);

  }
}



