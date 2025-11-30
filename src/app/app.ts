import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {NotificationComponent} from './notification/notification.component';
import {LoadingComponent} from './loading/loading.component';
import {filter, Subscription} from 'rxjs';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, NotificationComponent, LoadingComponent, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  showNavbar = true;
  private routerSubscription: Subscription | null = null;
  private readonly routesToHideNavbar = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
  ];

  constructor(private readonly router: Router) {
  }

  ngOnInit(): void {
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const isMatch = this.routesToHideNavbar.some(item => event.url.includes(item));
      this.showNavbar = !isMatch;
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
