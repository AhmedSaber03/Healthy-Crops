import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';





@Component({
  selector: 'app-posted-ad',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule, NzDropDownModule, NzIconModule],
  templateUrl: './posted-ad.component.html',
  styleUrl: './posted-ad.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PostedAdComponent {

  @Input() isAuction: boolean = false;
  
  constructor(private route: ActivatedRoute, private router: Router) {}

  products= [
    {id:1, name:'product1',
     mText:'Land Rover Range Rover Vogue HSE Autobiography 2022',
     currency:"QAR", price:"219,000", year:"2022",
     km:"160,000 km", adDate:"11 Dec 2023", adStatus:"Mark as Sold",
     sales:"By: Q-Motor", location:"Doha",
     image:'/assets/pic/products/Group 15759@2x.png',
     auctionImage: '/assets/pic/products/NoPath - Copy (6)@2x.png',
     status: 'Pending'},

     {id:2, name:'product2',
      mText:'Land Rover Range Rover Vogue HSE Autobiography 2022',
      currency:"EGP", price:"1,512,000", year:"2025",
      km:"20,000 km", adDate:"11 Dec 2021", adStatus:"Mark as Sold",
      sales:"By: Q-Motor", location:"Egypt",
      image:'/assets/pic/products/NoPath - Copy (4)@2x.png',
      auctionImage: '/assets/pic/products/NoPath - Copy (6)@2x.png',
      status: 'Active' },

      {id:2, name:'product3',
        mText:'Land Rover Range Rover Vogue HSE Autobiography 2022',
        currency:"QAR", price:"150,000", year:"2020",
        km:"100,000 km", adDate:"10 May 2023", adStatus:"Repost",
        sales:"By: Q-Motor", location:"Doha",
        image:'/assets/pic/products/NoPath - Copy (6)@2x.png',
        auctionImage: '/assets/pic/products/Group 15759@2x.png',
        status: 'Sold'},
     
    ]

    getProductImage(product: any): string {
      return this.isAuction ? product.auctionImage : product.image;
    }
  logClick(product: any): void {
    this.router.navigate(['/product-details', product.id]);
  }


  //status & button change 
  getStatusClass(status: string): string {
    
    switch (status) {
      case 'Pending':
        return 'status-pending'; // Gray
      case 'Active':
        return 'status-active'; // Green
      case 'Sold':
        return 'status-sold'; // Pink
      default:
        return '';
    }
  }
    
  getButtonClass(status: string): string {
    
    switch (status) {
      case 'Pending':
        return 'gray'; 
      case 'Active': 
      case 'Sold':
        return 'green';
      default:
        return '';
    }
  }
  

}
