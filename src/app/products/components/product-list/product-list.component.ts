import { selectProducts } from './../../store/index';
import { Observable } from 'rxjs';
import { loadProductsSuccess } from './../../../products/store/product.actions';
import { Component, OnInit } from "@angular/core";
import { Product } from "../../models/product";
import { ProductService } from "../../services/product.service";
import { Router } from "@angular/router";
import { Store, select } from '@ngrx/store';
import { ProductState } from '../../store';
import * as fromActions from '../../store/product.actions';

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {
  // products: Product[] = [];
  products$: Observable<Product[]>;

  constructor(private productService: ProductService, public router: Router, private store: Store<ProductState>) {}

  ngOnInit() {
    this.store.dispatch(fromActions.loadProducts());
    this.loadProducts();
  }

  loadProducts() {
    this.products$ =  this.store.pipe(select(selectProducts));
  }

  deleteProduct(id: number) {
    const productsObserver = {
      next: () => {
        console.log('Product Deleted');
        this.ngOnInit();
      },
      error: err => console.error(err)
    };
    this.productService.deleteProduct(id).subscribe(productsObserver);
  }
}
