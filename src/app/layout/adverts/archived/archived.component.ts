import { Component } from '@angular/core';
import { PostedAdComponent } from "../posted-ad/posted-ad.component";

@Component({
  selector: 'app-archived',
  standalone: true,
  imports: [PostedAdComponent],
  templateUrl: './archived.component.html',
  styleUrl: './archived.component.scss'
})
export class ArchivedComponent {

}
