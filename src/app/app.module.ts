import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TooltipComponent, TooltipContainerDirective } from './tooltip/tooltip.component';
import { TooltipDirective } from './tooltip.directive';

@NgModule({
  declarations: [
    AppComponent,
    TooltipComponent,
    TooltipDirective,
    TooltipContainerDirective
  ],
  imports: [
    BrowserModule
  ],
  entryComponents: [
    TooltipComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
