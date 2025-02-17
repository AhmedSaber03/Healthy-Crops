import { Component } from '@angular/core';
import { NavbarComponent } from "../home-page/navbar/navbar.component";
import { FooterComponent } from "../home-page/footer/footer.component";
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page404',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterModule],
  templateUrl: './page404.component.html',
  styleUrl: './page404.component.scss'
})
export class Page404Component {
  constructor(private router: Router) {
    this.router.navigate(['/page404'], { replaceUrl: true });
  }
}
