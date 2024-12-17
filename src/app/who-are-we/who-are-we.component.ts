import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-who-are-we',
  standalone: true,
  imports: [],
  templateUrl: './who-are-we.component.html',
  styleUrl: './who-are-we.component.scss'
})
export class WhoAreWeComponent {
  @Input() title: string = "";
  @Input() isRowReverse: boolean = false;

}
