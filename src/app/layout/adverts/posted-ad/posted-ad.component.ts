import { Component, ViewEncapsulation, OnInit, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NzDropDownModule, NzPlacementType } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { da } from 'intl-tel-input/i18n';


@Component({
  selector: 'app-posted-ad',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    NzDropDownModule,
    NzIconModule,
  ],
  templateUrl: './posted-ad.component.html',
  styleUrl: './posted-ad.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PostedAdComponent implements OnInit {
  @Input() isAuction: boolean = false;
  @Input() isArchived: boolean = false;

  products: any[] = [];
  filterSellingType: string = '';


  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.filterSellingType = this.isAuction ? 'post-auction' : this.isArchived ? 'Archived' : 'post-ad';
    
    this.loadProducts();
  }

  loadProducts() {
    this.http.get<any[]>('assets/mapingQmotors.json').subscribe(
      (data) => {
        this.products = data;
        this.products = data.filter(item => item.selling_type_key === this.filterSellingType);        
      },
      (error) => { 
        console.error('Error loading JSON file', error);
      }
    );
  }

  formatStatus(status: string): string {
    return status.charAt(0).toUpperCase() + status.slice(1);
  } 

  logClick(product: any): void {
    const foundProduct = this.products.find((p) => p.id === product.id);
    if (foundProduct) {
      this.router.navigate(['/cardetails']);
    } else {
      this.router.navigate(['/404']);
    }
  }

  //sstatus & button change
  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'status-pending'; 
      case 'active':
        return 'status-active'; 
      case 'sold':
        return 'status-sold'; 
      default:
        return '';
    }
  }
  
  getButtonClass(status: string): string {
    switch (status) {
      case 'pending':
        return 'gray';
      case 'active':
      case 'sold':
        return 'green';
      default:
        return '';
    }
  }
  
  isButtonDisabled(status: string): boolean { 
    return status === 'pending';
  }


  

  //acution calculate 

  calculateTimeLeft(expireAt: string): string {
    if (!expireAt) {
      return 'Invalid date';
    }
  
    const currentDate = new Date(); // Use current date and time
    const expireDate = new Date(expireAt);
  
    // Ensure the expire date is valid
    if (isNaN(expireDate.getTime())) {
      return 'Invalid date';
    }
  
    const timeDiff = expireDate.getTime() - currentDate.getTime();
  
    if (timeDiff <= 0) {
      return 'Expired';
    }
  
    const days = Math.floor(timeDiff / (1000 * 3600 * 24));
    const hours = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));
    const minutes = Math.floor((timeDiff % (1000 * 3600)) / (1000 * 60));
  
    return `${days}D : ${hours}H : ${minutes}M`;
  }
  
  
  

  //DropDown menu dissaple cards on click

  isDropdownOpen = false;

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen = true;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    this.closeDropdown();
  }


  //onError image 


  
}
