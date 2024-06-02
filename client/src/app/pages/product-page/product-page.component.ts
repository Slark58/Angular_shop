import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  activatedRoute: ActivatedRoute = inject(ActivatedRoute)


  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(data => {
     const id = data.get('id')
     console.log(Number(id))
    })
    
  }

}
