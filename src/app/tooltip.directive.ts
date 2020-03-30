import { Type, Directive, Input, ComponentRef, HostListener, ComponentFactoryResolver, ElementRef, ViewContainerRef, Renderer2, OnDestroy, TemplateRef, Injector } from '@angular/core';

import { TooltipComponent } from './tooltip/tooltip.component';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective implements OnDestroy {
 
  @Input('tooltip') content: string | TemplateRef<any> | Type<any>;

  private componentRef: ComponentRef<TooltipComponent>;
  
  constructor(
    private elementRef: ElementRef,
    private resolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2,
    private injector: Injector
  ) { }

  @HostListener('mouseenter') mouseEnter() {
    if (this.componentRef) {
      return;
    }
    const componentFactory = this.resolver.resolveComponentFactory(TooltipComponent);
    const injector = Injector.create([
      {
        provide: 'tooltipConfig',
        useValue: {
          host: this.elementRef.nativeElement,
        }
      }
    ]);
    this.componentRef = this.viewContainerRef.createComponent(componentFactory, 0, injector, this.generateNgContent());
  }

  generateNgContent() {
    if (typeof(this.content) === 'string') {
      const element = this.renderer.createText(this.content);
      return [[ element ]];
    }
    
    if (this.content instanceof TemplateRef) {
      const context = {};
      const viewRef = this.content.createEmbeddedView(context);
      return [ viewRef.rootNodes ];
    }

    const factory = this.resolver.resolveComponentFactory(this.content);
    const componentRef = factory.create(this.injector);
    return [[ componentRef.location.nativeElement ]];
  }

  @HostListener('mouseout') mouseOut() {
    this.destroyTooltip();
  }

  private destroyTooltip() {
    this.componentRef && this.componentRef.destroy();
    this.componentRef = null;
  }

  ngOnDestroy() {
    this.destroyTooltip();
  }

}