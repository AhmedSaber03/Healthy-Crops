import { Component, ViewEncapsulation, OnInit, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NzDropDownModule, NzPlacementType } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HttpClient } from '@angular/common/http';


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

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    // Determine the filter based on isAuction
    const filterSellingType = this.isAuction ? 'post-auction' : this.isArchived ? 'Archived' : 'post-ad';
  
    this.http.get<any[]>('assets/mapingQmotors.json').subscribe(
      (data) => {
        this.products = data
          .filter(item => item.selling_type_key === filterSellingType)
          .map(item => ({
            id: item.id,
            name: item.title || "____",
            currency: item.currency,
            price: item.price ? item.price.toLocaleString() : 'N/A',
            year: item.year || '0000',
            km: item.mileage ? `${item.mileage} ${item.mileage_unit}` : '0000 km',
            adDate: this.formatDate(item.date_posted) || "1-1-2025",
            adStatus: item.adStatus,
            sales: `By: ${item.seller}`,
            location: item.city || "Anywhere",
            image: item.image || 'assets/pic/products/NoPathCopy (6)@2x.jpg',
            auctionImage: item.image || 'assets/pic/products/NoPathCopy (6)@2x.jpg',
            status: this.formatStatus(item.status),
            type: item.selling_type_key,
          }));
      },
      (error) => {
        console.error('Error loading JSON file', error);
      }
    );
  }
      
  
  

  formatDate(dateString: string | null): string {
    if (!dateString) {
      return '1-1-2025';
    }
  
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }
  

  formatStatus(status: string): string {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }
  getProductImage(product: any): string {
    return this.isAuction ? product.auctionImage : product.image;
  }

  logClick(product: any): void {
    const foundProduct = this.products.find((p) => p.id === product.id);

    if (foundProduct) {
      this.router.navigate(['/product-details', product.id]);
    } else {
      this.router.navigate(['/404']);
    }
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
  isButtonDisabled(status: string): boolean {
    return status === 'Pending';
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
}
