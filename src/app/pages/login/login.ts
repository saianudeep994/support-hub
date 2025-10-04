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

  constructor(private auth: Authservice, private router: Router) {}

  onLogin() {
    this.auth.login(this.email).subscribe(user => {
      if (user) {
        if (user.role === 'Customer') {
          this.router.navigate(['/customer']);
        } else if (user.role === 'Agent') {
          this.router.navigate(['/agent']);
        } else if (user.role === 'Admin') {
          this.router.navigate(['/admin']);
        }
      } else {
        alert('Invalid credentials');
      }
    });
  }
}
