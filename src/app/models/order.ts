import { ShoppingCart } from './shopping-cart';

export class Order {
    datePlaced: number;
    items: any[] = [];

    constructor(public userId: string, public shipping: any, shoppingCart:  ShoppingCart) {
        this.datePlaced = new Date().getTime();

        for (const item in shoppingCart.items) {
            if (shoppingCart.items[item]) {
              this.items
              .push({
               product: {
                 title: shoppingCart.items[item].product.value.title,
                 imageUrl: shoppingCart.items[item].product.value.imageUrl,
                 price: shoppingCart.items[item].product.value.price
               },
               quantity: shoppingCart.items[item].quantity,
               totalPrice: shoppingCart.items[item].totalPrice
             });
            }
          }

    }
}
