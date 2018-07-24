import { map } from 'rxjs/operators';
import { Product } from './../models/product';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { CartItem } from '../models/cart-item';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$;
  subscription: Subscription;
  itemCount: number;
  cartProducts: {};
  cartItems: CartItem[];
  displayedColumns: string[] = ['title', 'quantity', 'total-price'];
  totalPrice: number;

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = (await this.shoppingCartService.getCart()).snapshotChanges();
    this.subscription = this.cart$
      .subscribe(
        cart => {
          this.cartItems = [];
          this.cartProducts = cart.payload.val().items;
          this.itemCount = 0;
          // tslint:disable-next-line:forin
          for (const productId in this.cartProducts) {
            this.itemCount += this.cartProducts[productId].quantity;
            this.cartItems
             .push(new CartItem(
              ({ key: productId, value: this.cartProducts[productId].product.value}),
                this.cartProducts[productId].quantity));
        }
      });
  }

  getQuantity(product: Product) {
    const item = this.cartProducts[product.key];
    if (!item) {
      return 0;
    }
    return item.quantity;
  }

  getTotalPrice() {
    let total = 0;

    for (const i of this.cartItems) {
      if (i.totalPrice) {
        total += i.totalPrice;
      }
    }
    return total;
  }
}
