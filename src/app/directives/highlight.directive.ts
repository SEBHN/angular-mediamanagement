import { Directive, HostBinding, ElementRef, Renderer2, HostListener, OnInit } from '@angular/core';

/**
 * Use this directive to highlight an HTML element.
 * It adds the .text-warning Bootstrap4 class to the element
 * when hovered over
 */
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {

  // properties get injected by Angular
  private elementRef: ElementRef;
  private renderer: Renderer2;

  constructor(elementRef: ElementRef, renderer: Renderer2) {
    this.elementRef = elementRef;
    this.renderer = renderer;
  }

  ngOnInit() {}

  /**
   * Binds a CSS Event (as an arg) to the hosting element and invokes the
   * handler method (here mouseEnter()) when this CSS event occurs.
   * @param eventData IS OPTIONAL. Can be used to catch detailed event data
   */
  @HostListener('mouseenter') mouseEnter(eventData: Event) {
    this.renderer.addClass(this.elementRef.nativeElement, 'text-warning');
  }

  @HostListener('mouseleave') mouseLeave(eventData: Event) {
    this.renderer.removeClass(this.elementRef.nativeElement, 'text-warning');
  }
}