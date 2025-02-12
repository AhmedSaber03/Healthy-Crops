import { Component } from '@angular/core';
import { PostedAdComponent } from '../posted-ad/posted-ad.component';
@Component({
  selector: 'app-auctions',
  standalone: true,
  imports: [PostedAdComponent],
  templateUrl: './auctions.component.html',
  styleUrl: './auctions.component.scss'
})
export class AuctionsComponent {

}
