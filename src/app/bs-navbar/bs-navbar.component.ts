import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  shoppingCartItemCount: number;

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService) {

  }

 logout() {
    this.auth.logout();
 }

 async ngOnInit() {
  this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
  const cart$ = (await this.shoppingCartService.getCart());
  cart$.subscribe(cart => {

    this.shoppingCartItemCount = 0;
    // tslint:disable-next-line:forin
    for (const productId in cart.items) {
      this.shoppingCartItemCount += cart.items[productId].quantity;
    }
  });

 }

}
