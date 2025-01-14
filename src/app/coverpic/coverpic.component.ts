import { Component, ViewEncapsulation ,Input} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-coverpic',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './coverpic.component.html',
  styleUrl: './coverpic.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CoverpicComponent {
    @Input() bgUrl!: string; 
    @Input() pageTitle!:string;
    
}
