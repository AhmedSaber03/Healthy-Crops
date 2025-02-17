import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../home-page/navbar/navbar.component';
import { FooterComponent } from '../home-page/footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';

interface Tab {
  id: number;
  name: string;
  route: string;
  parentId?: number;
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    TranslateModule,
    CommonModule,
    RouterModule,
    NzLayoutModule,
    NzTabsModule,
    NzCollapseModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent implements OnInit {
  tabs = [
    { id: 0, name: 'layout.myProfile.myProfile', route: 'account/profile' },
    { id: 1, name: 'layout.Wallet.wallet', route: 'account/wallet' },
    { id: 2, name: 'layout.Cart.Cart', route: 'account/cart' },
    {
      id: 3,
      name: 'layout.Adverts.MyAdverts',
      route: 'account/adverts',
      children: [
        { id: 4, name: 'PostedAds', route: 'adverts/posted-ad' },
        { id: 5, name: 'Auctions', route: 'adverts/auctions' },
        { id: 6, name: 'Archived', route: 'adverts/archived' },
      ],
    },
  ];

  selectedTab = 0;
  selectedChildTab: string | null = null;

  constructor(private router: Router, private route: ActivatedRoute) {}

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  ngOnInit() {
    this.setActiveTabFromRoute();
  
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setActiveTabFromRoute();
      }
    });
  }
  
  setActiveTabFromRoute() {
    const currentUrl = this.router.url;

    const parentTab = this.tabs.find(tab => currentUrl.includes(tab.route));
    if (parentTab) {
      this.selectedTab = parentTab.id;
    }
  
    const activeParentTab = this.tabs.find(tab => tab.children?.some(child => currentUrl.includes(child.route)));
    if (activeParentTab) {
      this.selectedTab = activeParentTab.id;
      const activeChildTab = activeParentTab.children?.find(child => currentUrl.includes(child.route));
      this.selectedChildTab = activeChildTab?.route || null;
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
    this.selectedChildTab = childTab.route;
    this.router.navigate([childTab.route], { relativeTo: this.route });
  }
}
