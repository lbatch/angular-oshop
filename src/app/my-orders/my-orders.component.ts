import { switchMap } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import { Observable, Subscription, of } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['customer', 'date'];
  orders$;
  orders;
  authSubscription: Subscription;
  ordersSubscription: Subscription;

  constructor(
    private orderService: OrderService,
    private authService: AuthService) {
  }

  ngOnInit() {

    this.authSubscription =
      this.authService.user$.subscribe(
        u => {
          if (u) {
            this.orders$ = this.orderService.getOrdersByUser(u.uid);

            this.ordersSubscription = this.orders$.subscribe(
              o => {
              this.orders = o;
            }
          );
          }
          return of(null);
        }
      );


  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    this.ordersSubscription.unsubscribe();
  }
}

