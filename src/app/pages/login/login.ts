import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Authservice } from '../../shared/services/auth/authservice';

@Component({
  selector: 'LoginComponent',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  email = '';
  password = ''; // not checked for now
  toast: any;

  constructor(private auth: Authservice, private router: Router) {}
  onLogin(): void {
    this.auth.login(this.email, this.password).subscribe({
      next: user => {
        const role = user?.roles?.[0]?.roleName;
        switch (role) {
          case 'Customer':
            this.router.navigate(['/customer']);
            break;
          case 'Agent':
            this.router.navigate(['/agent']);
            break;
          case 'Admin':
            this.router.navigate(['/admin']);
            break;
          default:
            this.toast.error('Unknown or missing role');
        }
      },
      error: (err: any) => {
        const msg = err?.friendly ?? 'Login failed';
        this.toast.error(msg);
        // optional: extra handling for specific codes
        if (err.status === 429) this.toast.info('Too many attempts. Please wait.');
      }
    });
  }
  signup(): void {
    this.router.navigate(['/signup']);
  }
}

