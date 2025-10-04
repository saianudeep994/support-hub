import { Component } from '@angular/core';
import { Authservice } from '../../shared/services/auth/authservice';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'MainLayoutComponent',
  imports: [RouterOutlet, RouterLink,CommonModule],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.scss']
})
export class MainLayoutComponent {
  constructor(private auth: Authservice, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/home']);
  }
  login() {
    this.router.navigate(['/login']);
  }

  get user() {
    return this.auth.getCurrentUser();
  }

  hasRole(allowedRoles: string[]): boolean {
    const userRole = this.auth.getUserRole();
    return allowedRoles.includes(userRole || '');
  }
  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }
}
