import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appCountOfSize]',
})
export class CountOfSizeDirective implements OnInit {
  @Input('appCountOfSize') valueSize?: number | string;

  private tooltipElement?: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') OnMouseEvent(): void {
    this.showTooltip();
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.hideToooltip();
  }

  ngOnInit(): void {
    this.tooltipElement = this.renderer.createElement('div');
    if (this.valueSize) {
      console.log(this.el);

      this.renderer.appendChild(
        this.tooltipElement,
        this.renderer.createText(this.valueSize.toString())
      );
      this.renderer.appendChild(this.el.nativeElement, this.tooltipElement);
    }
    this.renderer.addClass(this.tooltipElement, 'tooltip-def');
  }

  private showTooltip() {
    // const hostPos = this.el.nativeElement.getBoundingClientRect() as DOMRect;
    // const tooltipPos = this.tooltipElement?.getBoundingClientRect() as DOMRect;
    // const scrollPos = window.scrollY;

    // const top = hostPos.top - 35;
    // const a = hostPos.left;

    this.renderer.addClass(this.tooltipElement, 'tooltip-active');
    this.renderer.removeClass(this.tooltipElement, 'tooltip-def');
  }

  private hideToooltip() {
    if (this.tooltipElement) {
      this.renderer.addClass(this.tooltipElement, 'tooltip-def');
      this.renderer.removeClass(this.tooltipElement, 'tooltip-active');

      // this.renderer.removeChild(this.el.nativeElement, this.tooltipElement);
      // this.tooltipElement = undefined;
    }
  }
}
