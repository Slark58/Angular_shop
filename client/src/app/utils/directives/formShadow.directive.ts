import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({ selector: '[formShadow]' })
export class FormShadowDirective implements AfterViewInit {
  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {
    // this.el.nativeElement.style.backgroundColor = '#000'
    console.log(this.el.nativeElement);
  }

  ngAfterViewInit(): void {
    this.el.nativeElement.querySelectorAll('test');
  }

  @HostListener('focusin') onFocusIn(event: FocusEvent) {
    this.checkAndApplyShadow();
  }

  @HostListener('focusout') onFocusOut(event: FocusEvent) {
    this.checkAndApplyShadow();
  }

  private checkAndApplyShadow() {
    const inputs = this.el.nativeElement.querySelectorAll('input');

    let hasFocus = false;

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i] === document.activeElement) {
        hasFocus = true;
        break;
      }
    }

    if (hasFocus) {
      this.renderer.addClass(this.el.nativeElement, 'directive-card');
      // this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '1px 4px 10px 5px #673AB7 inset');
    } else {
      // this.renderer.removeStyle(this.el.nativeElement, 'box-shadow');
      this.renderer.removeClass(this.el.nativeElement, 'directive-card');
    }
  }
}
