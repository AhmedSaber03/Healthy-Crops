import { Component  } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { SliderComponent } from './slider/slider.component';
import { WhoAreWeComponent } from './who-are-we/who-are-we.component';
import { ProductsComponent } from './products/products.component';
import { TechnologyComponent} from './technology/technology.component';
import { GlobalComponent} from './global/global.component';
import { FooterComponent} from './footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
 

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    NavbarComponent, SliderComponent, WhoAreWeComponent,
    ProductsComponent, TechnologyComponent, GlobalComponent, FooterComponent, TranslateModule, RouterModule  ],

  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
}