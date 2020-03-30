import { Component, OnInit, Directive, ViewChild, ComponentRef, ElementRef, Inject } from '@angular/core';

@Directive({
  selector: '.tooltip-container'
})
export class TooltipContainerDirective { }

@Component({
  selector: 'app-tooltip',
  template: `
    <div #tooltipContainer class="tooltip-container" [ngStyle]="{ top: top }">
      <ng-content></ng-content>
    </div>
  `,
  styles: []
})
export class TooltipComponent implements OnInit {

  //@ViewChild(TooltipContainerDirective, { read: ElementRef}) tooltipContainer: ElementRef;
  @ViewChild('tooltipContainer') tooltipContainer;

  public top: string;

  constructor(
    @Inject('tooltipConfig') private tooltipConfig
  ) { }

  ngOnInit() {
    const { top } = this.tooltipConfig.host.getBoundingClientRect();
    const { height } = this.tooltipContainer.nativeElement.getBoundingClientRect(); 
    
    this.top = `${top - height}px`;
    this.tooltipContainer.nativeElement.style.top = `${top - height}px`;

  }

}
