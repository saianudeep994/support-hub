import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class Supportticketservice {
  private apiUrl = 'http://localhost:3000/tickets';
  private tokenKey = 'auth_token';
  private userKey = 'auth_user';

  constructor(private http: HttpClient) {}


  getCurrentUser() {
    const userStr = localStorage.getItem(this.userKey);
    return userStr ? JSON.parse(userStr) : null;
  }
  getUserRole(): string | null {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }

  getTicketsAssignedToCurrentAgent(): Observable<any[]> {
    const user = this.getCurrentUser();
    if (!user || !user.id) {
      return new Observable<any[]>(observer => {
        observer.next([]);
        observer.complete();
      });
    }
    // Assuming tickets endpoint and query param for raisedBy
    return this.http.get<any[]>(`${this.apiUrl}?agentId=${user.id}&agentId_ne=null`);
  }
}
