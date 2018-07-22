import { take } from 'rxjs/operators';
import { Product } from './models/product';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async addToCart(product: Product) {
    const cartId = await this.getOrCreateCartId();
    const item = this.getItem(cartId, product.key);
    item.snapshotChanges().pipe(take(1)).subscribe(i => {
      if (i.payload.val()) {
        item.update({ product: product, quantity: i.payload.val().quantity + 1});
      } else {
        item.update({ product: product, quantity: 1});
      }
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  async getCart() {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    }

    const result = await this.create();
    localStorage.setItem('cardId', result.key);
    return result.key;
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }
}
