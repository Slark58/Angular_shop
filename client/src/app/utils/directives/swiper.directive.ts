import { AfterViewInit, Directive, ElementRef, HostListener, Input } from '@angular/core';
import {register} from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types';

register();

@Directive({
  selector: '[swiperElement]'
})
export class SwiperDirective implements AfterViewInit {
  private readonly swiperElement: HTMLElement;
  @Input('config')
  config?: SwiperOptions;

  constructor(private element: ElementRef<HTMLElement>) {
    this.swiperElement = element.nativeElement;
  }

  ngAfterViewInit(): void {
    console.log(this.element.nativeElement);
    console.log(this.config);
    
    
    Object.assign(this.element.nativeElement, this.config);
    console.log(Object.assign(this.element.nativeElement, this.config));
    
    // @ts-ignore - We ignore this because there is no initialize method on the HTMLElement
    this.element.nativeElement.initialize();
  }

  // @HostListener('')
}