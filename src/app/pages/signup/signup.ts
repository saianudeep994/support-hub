import { CommonModule } from '@angular/common';
import { HttpClient ,HttpErrorResponse} from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Signup } from '../../shared/models/auth/signup';
import { Authservice } from '../../shared/services/auth/authservice';
import { finalize, timer } from 'rxjs';
import { Router } from '@angular/router';

type SignupForm = FormGroup<{
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  roles: FormArray<FormControl<string | null>>;
  
}>;

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss']
})
export class SignupComponent  implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private authservice = inject(Authservice);
  private router = inject(Router);

  form!: SignupForm;
  submitting = false;
  errorMsg = '';
  successMsg = '';


  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.fb.control<string>('', { validators: [Validators.required, Validators.minLength(3)] }),
      email: this.fb.control<string>('', { validators: [Validators.required, Validators.email] }),
      password: this.fb.control<string>('', { validators: [Validators.required, Validators.minLength(8)] }),
      roles: this.fb.array([this.fb.control<string>('Customer', { validators: [Validators.required] })])
    }) as SignupForm;
  }

  // convenience getters
  get f() { return this.form.controls; }
  get rolesArray() { return this.form.controls.roles; }

  addRole(roleName = 'Customer'): void {
    this.rolesArray.push(this.fb.control<string>(roleName, { validators: [Validators.required] }));
  }

  removeRole(i: number): void {
    this.rolesArray.removeAt(i);
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    // Build payload matching interfaces precisely
    const payload: Signup = {
      name: this.f['name'].value!.trim(),
      email: this.f['email'].value!.trim().toLowerCase(),
      password: this.f['password'].value!,
      roles: this.rolesArray.controls.map(g => g.value!)
    };

    this.submitting = true;
    this.errorMsg = '';
    this.successMsg = '';

    this.authservice.signup(payload).pipe(
      finalize(() => { this.submitting = false; }) // always stop spinner
    ).subscribe({
      next: user => {
        this.successMsg = 'Account created successfully';
        this.form.reset();
        this.rolesArray.clear();
        this.addRole('Customer');
        timer(3000).subscribe(() => this.router.navigate(['/Login']));
      },
      error: (err: any) => {
        this.errorMsg = err?.friendly ?? 'Signup failed';
      }
    });
  }
}