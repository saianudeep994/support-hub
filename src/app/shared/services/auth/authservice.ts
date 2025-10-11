import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Signup } from '../../models/auth/signup';

@Injectable({
  providedIn: 'root'
})
export class Authservice {
  //private apiUrl = 'http://localhost:3000/users'; // json db endpoint
  private apiUrl = 'https://localhost:5001/api/Auth'; // Update with your actual login endpoint
  private tokenKey = 'auth_token';
  private userKey = 'auth_user';


  constructor(private http: HttpClient) {}

  // login(email: string): Observable<any> {
  //   return this.http.get<any[]>(`${this.apiUrl}?email=${email}`).pipe(
  //     map(users => {
  //       if (users.length > 0) {
  //         const user = users[0];
  //         const fakeJwt = 'fake-jwt-token-' + user.id;
  //         localStorage.setItem(this.tokenKey, fakeJwt);
  //         localStorage.setItem(this.userKey, JSON.stringify(user));
  //         return user;
  //       }
  //       return null;
  //     })
  //   );
  // }
  login(email: string, password: string): Observable<any> {
    const body = { email, password };

    return this.http.post<any>(this.apiUrl+"/Login", body).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          const user = {
            userId: response.userId,
            name: response.name,
            email: response.email,
            roles: response.roles
          };
          localStorage.setItem(this.userKey, JSON.stringify(user));
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  // getCurrentUser() {
  //   const userStr = localStorage.getItem(this.userKey);
  //   return userStr ? JSON.parse(userStr) : null;
  // }
  getCurrentUser(): any | null {
    try {
      const userStr = localStorage.getItem(this.userKey);
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  }

  // isLoggedIn(): boolean {
  //   return !!localStorage.getItem(this.tokenKey);
  // }
  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token;
  }

  getUserRole(): string | null {
    const user = this.getCurrentUser();
    return user ? user.roles[0].roleName : null;
  }
  getUserRoles(): string[] {
    const user = this.getCurrentUser();
    if (!user || !user.roles) return [];
    return user.roles.map((r: any) => r.roleName);
  }
  getUserNamebyId(userId: string): Observable<string> {
    return this.http.get<any>(`${this.apiUrl}/GetUserById/${userId}`).pipe(
      map(user => user ? user.name : 'Unknown User')
    );
  }

  signup(payload:Signup): Observable<any> {
    //const body = { name, email, password, roles };
    return this.http.post<any>(this.apiUrl+"/Signup", payload).pipe(
      tap(user => {
        // optional: persist token
        if (user?.token) localStorage.setItem('token', user.token);
      }),
      catchError((err: HttpErrorResponse) => {
        const friendly =
          err.status === 409 ? 'Email already registered' :
          err.status === 0   ? 'Network error. Check connection.' :
                               'Signup failed. Please try again.';
        return throwError(() => ({ ...err, friendly }));
      })
    );
  }

}
