import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <p tooltip="It's just a simple text tooltip">Tooltip from text</p>
    </div>
  `,
  styles: [ ]
})
export class AppComponent {
  title = 'app';
}
