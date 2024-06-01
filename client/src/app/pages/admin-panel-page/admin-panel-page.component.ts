import { Component, OnInit, inject } from '@angular/core';
import { AdminPaths } from '../../app-routing.module';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel-page',
  templateUrl: './admin-panel-page.component.html',
  styleUrls: ['./admin-panel-page.component.scss']
})
export class AdminPanelPageComponent implements OnInit {

  router: Router = inject(Router)
  activeRoute: ActivatedRoute = inject(ActivatedRoute)

  public nav = navigationLinks

  ngOnInit(): void {
    this.router.navigate([AdminPaths.Products], {relativeTo: this.activeRoute})
  }

  
}


const navigationLinks = [
  {
    link: 'products',
    title: 'Products',
  },
  {
    link: 'users',
    title: 'User',
  },
  {
    link: 'orders',
    title: 'Orders',
  },
 
]
