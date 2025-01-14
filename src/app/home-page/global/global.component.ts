import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-global',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './global.component.html',
  styleUrl: './global.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class GlobalComponent {

}
