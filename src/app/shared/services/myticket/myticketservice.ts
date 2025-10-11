import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Authservice } from '../auth/authservice';

@Injectable({
  providedIn: 'root'
})
export class Myticketservice {
  private apiUrl = 'http://localhost:3000/tickets';
  private tokenKey = 'auth_token';
  private userKey = 'auth_user';

  constructor(private http: HttpClient, private authservice: Authservice) {}


  getCurrentUser() {
    const userStr = localStorage.getItem(this.userKey);
    return userStr ? JSON.parse(userStr) : null;
  }
  getUserRole(): string | null {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }
  getUserNamebyId(userId: string): Observable<string> {
    // return this.http.get<any>(`http://localhost:3000/users/${userId}`).pipe(
    //   map(user => user ? user.name : 'Unknown User')
    // );
    return this.authservice.getUserNamebyId(userId);
  }

  getTicketsRaisedByCurrentUser(): Observable<any[]> {
    const user = this.getCurrentUser();
    if (!user || !user.userId) {
      return new Observable<any[]>(observer => {
        observer.next([]);
        observer.complete();
      });
    }
    // Assuming tickets endpoint and query param for raisedBy
    return this.http.get<any[]>(`${this.apiUrl}?customerId=${user.userId}`);
  }

  getTicketsAssignedToCurrentAgent(): Observable<any[]> {
    const user = this.getCurrentUser();
    if (!user || !user.userId) {
      return new Observable<any[]>(observer => {
        observer.next([]);
        observer.complete();
      });
    }
    // Only tickets where agentId equals user.userId and agentId is not null
    return this.http.get<any[]>(`${this.apiUrl}?agentId=${user.userId}&agentId_ne=null`);
  }

  searchTickets(query: string): Observable<any[]> {
    if (!query) {
      return new Observable<any[]>(observer => {
        observer.next([]);
        observer.complete();
      });
    }
    
    // Assuming tickets endpoint and query param for search
    return this.http.get<any[]>(`${this.apiUrl}?id=${query}`);
    
  }
  getTicketComments(ticketId: string): Observable<any[]> {
    // Assuming comments endpoint and query param for ticketId
    return this.http.get<any[]>(`http://localhost:3000/ticketComments?ticketId=${ticketId}`);
  }
  addComment(comment: any): Observable<any> {
    // POST to backend to add comment
    return this.http.post<any>('http://localhost:3000/ticketComments', comment);
  }

  updateTicket(ticket: any): Observable<any> {
    // PUT to backend to update ticket
    return this.http.put<any>(`${this.apiUrl}/tickets/${ticket.id}`, ticket);
  }

}
