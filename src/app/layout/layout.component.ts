import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../home-page/navbar/navbar.component';
import { FooterComponent } from "../home-page/footer/footer.component";
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';


interface Tab {
  id: number;
  name: string;
  route: string;
  parentId?: number; // Identifies child tabs
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, TranslateModule, CommonModule, RouterModule, NzLayoutModule, NzTabsModule, NzCollapseModule ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent {



  tabs = [
    { id: 0, name: 'layout.myProfile.myProfile', route: 'profile' },
    { id: 1, name: 'layout.Wallet.wallet', route: 'wallet' },
    { id: 2, name: 'layout.Cart.Cart', route: 'cart' },
    { 
      id: 3, 
      name: 'layout.Adverts.MyAdverts', 
      route: 'adverts',
      children: [
        { id: 4, name: 'PostedAds', route: 'adverts/posted-ad' },
        { id: 5, name: 'Auctions', route: 'adverts/auctions' },
        { id: 6, name: 'Archived', route: 'adverts/archived' }
      ]
    }
  ];
  

  selectedTab = 0;

  constructor(private router: Router, private route: ActivatedRoute) {}
  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }
  ngOnInit() {
    this.router.navigate(['/profile']);
    this.selectedTab = 0;
    const currentRoute = this.route.snapshot.firstChild?.routeConfig?.path;
    if (currentRoute) {
      const foundTab = this.tabs.findIndex(tab => tab.route === currentRoute);
      this.selectedTab = foundTab !== -1 ? foundTab : 0;
    } else {
      this.router.navigate(['profile'], { relativeTo: this.route });
    }
  }

  onTabChange(index: number): void {
    this.selectedTab = index;
    const tab = this.tabs[index];
    
    if (tab && tab.route) {
      this.router.navigate([tab.route], { replaceUrl: true });
    }
  }  
  
  
  onTabChangeChild(childTab: any): void {
    this.router.navigate([childTab.route], { relativeTo: this.route }); // ✅ Ensure it uses parent route
  }
  
}
