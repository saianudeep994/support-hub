import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Myticketservice } from '../../shared/services/myticket/myticketservice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'TicketDetailComponent',
  imports: [CommonModule, FormsModule],
  templateUrl: './ticket-detail.html',
  styleUrls: ['./ticket-detail.scss']
})
export class TicketDetailComponent implements OnInit {
  @Input() id: string | null = null;
  ticket: any[] = [];
  comments: any[] = [];
  users: any[] = [];
  newComment: string = '';

  constructor(
    private route: ActivatedRoute,
    private ticketService: Myticketservice
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
  }

  loadUsers() {
    // Replace with your service call
    // Example: this.users = allUsers;
  }

  getUserName(authorId: string): string {
    const user = this.users.find(u => u.id === authorId);
    return user ? user.fullName : 'Unknown';
  }

  addComment() {
    if (!this.newComment.trim()) return;
    const comment = {
      id: Math.random().toString(36).substr(2, 9),
      ticketId: this.ticket[0].id,
      authorId: 'currentUserId', // Replace with actual current user ID
      content: this.newComment,
      createdAt: new Date().toISOString()
    };
    // Save comment (call your service)
    this.comments.push(comment);
    this.newComment = '';
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
