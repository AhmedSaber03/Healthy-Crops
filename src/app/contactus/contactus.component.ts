import { Component } from '@angular/core';
import { NavbarComponent } from '../home-page/navbar/navbar.component';
import { CoverpicComponent } from '../coverpic/coverpic.component';
import { FooterComponent } from "../home-page/footer/footer.component";
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [NavbarComponent, CoverpicComponent, FooterComponent, TranslateModule ],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.scss'
})
export class ContactusComponent {

}
