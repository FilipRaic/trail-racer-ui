import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private readonly authService: AuthService) {
  }

  get isAdmin(): boolean {
    return this.authService.currentUserRole === 'ADMIN';
  }

  get isApplicant(): boolean {
    return this.authService.currentUserRole === 'APPLICANT';
  }

  logout() {
    this.authService.logout();
  }
}
