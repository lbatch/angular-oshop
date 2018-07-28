import { Subscription } from 'rxjs';
import { Order } from './../../models/order';
import { OrderService } from './../../order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['customer', 'date'];
  orders$;
  orders;
  subscription: Subscription;

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.orders$ = this.orderService.getOrders().snapshotChanges();
    this.subscription = this.orders$.subscribe(
      o => {
        this.orders = o;
      }
    );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
