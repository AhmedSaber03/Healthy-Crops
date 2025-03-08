import { Component } from '@angular/core';
import { NavbarComponent } from "../../../home-page/navbar/navbar.component";
import { FooterComponent } from "../../../home-page/footer/footer.component";
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-productdcar',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterModule],
  templateUrl: './productdcar.component.html',
  styleUrl: './productdcar.component.scss'
})
export class ProductdcarComponent {

}
