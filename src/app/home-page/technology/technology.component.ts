import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-technology',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './technology.component.html',
  styleUrl: './technology.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class TechnologyComponent {

}
