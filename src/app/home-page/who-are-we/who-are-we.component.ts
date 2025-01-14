import { Component, Input, ViewEncapsulation  } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-who-are-we',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './who-are-we.component.html',
  styleUrl: './who-are-we.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class WhoAreWeComponent {
  @Input() title: string = "";
  @Input() isRowReverse: boolean = false;

}
