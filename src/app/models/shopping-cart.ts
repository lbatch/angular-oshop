import { Product } from './product';
import { CartItem } from './cart-item';

export class ShoppingCart {
  items: CartItem[] = [];

  constructor(private itemsMap: { [productId: string]: CartItem }) {
    this.itemsMap = itemsMap || {};

    for (const productId in itemsMap) {
        if (itemsMap[productId]) {
          const item = itemsMap[productId];
          this.items.push(new CartItem(item.product, item.quantity));
        }
    }
  }

  getQuantity(product: Product) {
    const item = this.itemsMap[product.key];
    return item ? item.quantity : 0;
  }

  get totalPrice() {
    let sum = 0;
    for (const productId in this.items) {
        if (this.items[productId]) {
            sum += this.items[productId].totalPrice;
        }
    }

    return sum;
  }

  get totalItemsCount() {
    let count = 0;
    for (const productId in this.items) {
        if (this.items[productId]) {
            count += this.items[productId].quantity;
        }
    }
    return count;
  }
}
