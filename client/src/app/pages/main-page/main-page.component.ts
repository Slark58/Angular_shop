import { Component, ElementRef, ViewChild } from '@angular/core';
import { Swiper } from 'swiper';
import { SwiperOptions } from 'swiper/types';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

      // swiper?: Swiper;
      // @ViewChild('swiperRef')
      // swiperRef: ElementRef | undefined;
      // slides: Array<{title: string}> = [
      //   {
      //     title: "Slide 1"
      //   },
      //   {
      //     title: "Slide 2"
      //   },
      //   {
      //     title: "Slide 3"
      //   },
      // ]

      // // ngAfterViewInit() {
      // //   this.swiper = this.swiperRef?.nativeElement.swiper;
      // // }

      // public config: SwiperOptions = {
      //   slidesPerView: 1,
      //   spaceBetween: 25,
      //   loop: true,
      //   breakpoints: {
      //     320: {
      //       slidesPerView: 1.5,
      //     },
      //     768: {
      //       slidesPerView: 1,
      //     },
      //     1280: {
      //       slidesPerView: 1,
      //     }
      //   },

      //   pagination: true

      // }


}
