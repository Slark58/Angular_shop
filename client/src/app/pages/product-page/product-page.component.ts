import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types';
import { FullProduct } from '../../models/Main';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit{

  productsService: ProductsService = inject(ProductsService)
  activatedRoute: ActivatedRoute = inject(ActivatedRoute)
  product$?: Observable<FullProduct>
  


  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
     const id = +data['id']
     this.product$ = this.productsService.getProductById(id)
     this.product$.subscribe(data => console.log(data))
     
    })
  
  }

}
