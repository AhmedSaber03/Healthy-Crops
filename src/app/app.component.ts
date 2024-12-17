import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';  // Import TranslateService

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Healthy_Crops';
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');  // Set the default language to English
    this.translate.use('en');  // Set initial language
  }
}
