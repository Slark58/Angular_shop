import { AfterViewInit, Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCardMask]',
  standalone: true,
})
export class CardMaskDirective implements AfterViewInit, OnInit {

  constructor(private el: ElementRef<HTMLInputElement>, private renderer: Renderer2) { }
  

  ngOnInit(): void {
  }
  
  
  


  ngAfterViewInit() {
    this.el.nativeElement.setSelectionRange(1, 5);
    // this.el.nativeElement.disabled = true;
    this.el.nativeElement.value = 'qweqwe'

  }

}
