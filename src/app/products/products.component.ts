import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../category.service';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories$;
  category: string;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    categoryService: CategoryService) {

    route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      productService.getAll().subscribe(products => {
        this.products = products;
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.payload.val().category === this.category) :
          this.products;
      });
    });

    this.categories$ = categoryService.getAll();
  }
}
