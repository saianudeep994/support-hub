import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Myticketservice } from '../../shared/services/myticket/myticketservice';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Authservice } from '../../shared/services/auth/authservice';

@Component({
  selector: 'TicketDetailComponent',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './ticket-detail.html',
  styleUrls: ['./ticket-detail.scss']
})
export class TicketDetailComponent implements OnInit {
  @Input() id: string | null = null;
  ticket: any[] = [];
  comments: any[] = [];
  users: any[] = [];
  newComment: string = '';
  userName: string = '';
  statusForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private ticketService: Myticketservice,
    private authservice: Authservice
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
       this.id = params['id'];
    });
    if (this.id !== null) {
      this.ticketService.searchTickets(this.id).subscribe(results => {
        this.ticket = results;
      });
    } else {
      // Handle the case where id is null, e.g., show an error or set ticket to null
      this.ticket = [];
    }
    this.loadComments();
    this.loadUsers();
  }

  loadComments() {
    // Replace with your service call
    // Example: this.comments = allComments.filter(c => c.ticketId === this.ticket[0].id);
    this.ticketService.getTicketComments(this.id || '').subscribe(comments => {
      this.comments = comments;
    });
  }

  loadUsers() {
    // Replace with your service call
    // Example: this.users = allUsers;

  }

  getUserName(authorId: string): string {
    const user = this.users.find(u => u.id === authorId);
    return user ? user.fullName : 'Unknown';
    // const user = this.ticketService.getCurrentUser();
    // return user ? user.name : 'Unknown User';
  }
  getcurrentUserName(): string {
    this.authservice.getUserNamebyId(this.ticket[0].authorId).subscribe(name => this.userName = name);
    return this.userName;
  }

  addComment() {
    if (!this.newComment.trim()) return;
    const comment = {
      id: Math.random().toString(36).substr(2, 9),
      ticketId: this.ticket[0].id,
      authorId: this.getcurrentUserName(), // Replace with actual current user ID
      content: this.newComment,
      createdAt: new Date().toISOString()
    };
    // Save comment (call your service)
    this.comments.push(comment);
    this.ticketService.addComment(comment).subscribe();
    this.newComment = '';
  }
  onSaveStatus(): void {
    if (this.ticket.length === 0) return;
    const updatedTicket = { ...this.ticket[0] };
    this.ticketService.updateTicket(updatedTicket).subscribe(() => {
      alert('Ticket status updated successfully.');
    }
    );
  }

  getStatusWidth(status: string): string {
    switch (status) {
      case 'Open': return '33%';
      case 'In Progress': return '66%';
      case 'Closed': return '100%';
      default: return '0%';
    }
  }
  
  getStatusValue(status: string): number {
    switch (status) {
      case 'Open': return 33;
      case 'In Progress': return 66;
      case 'Closed': return 100;
      default: return 0;
    }
  }
  getStatusStepperWidth(status: string): string {
  switch (status) {
    case 'Open': return '0%';
    case 'In Progress': return '50%';
    case 'Closed': return '100%';
    default: return '0%';
    }
  }
}
