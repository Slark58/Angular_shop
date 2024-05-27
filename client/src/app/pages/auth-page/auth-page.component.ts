import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Paths } from '../../app-routing.module';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {

  router = inject(Router)

  isSignUp = signal(true)

  constructor(private activaRoute: ActivatedRoute) {}

  public isLogin: boolean | null = null

  ngOnInit(): void {
    
    if (this.activaRoute.snapshot.url[0].path === Paths.Signup) {
      this.isSignUp.set(true)
    } else {
      this.isSignUp.set(false)
    }
  }
  
  
}
