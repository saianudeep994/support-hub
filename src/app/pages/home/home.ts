import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Myticketservice } from '../../shared/services/myticket/myticketservice';
import { Supportticketservice } from '../../shared/services/support/supportticketservice';
import { CommonModule } from '@angular/common';
import { NewTicketForm } from '../../shared/components/new-ticket-form/new-ticket-form';

@Component({
  selector: 'HomeDashboardComponent',
  imports: [FormsModule,CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeDashboardComponent {
  searchQuery = '';
  showMyRequestsTable = false;
  showAssignedRequestsTable = false;
  showNewTicketFormFlag = false;
  myTickets: any[] = [];
  assignedTickets: any[] = [];

  constructor(private myticketService: Myticketservice, private supportTicketService: Supportticketservice) {}

  searchRequests() {
    //alert(`Searching for: ${this.searchQuery}`);
    this.myticketService.searchTickets(this.searchQuery).subscribe(results => {
      // Handle search results
      this.myTickets = results;
      this.showMyRequestsTable = true;
    });
  }
  showNewTicketForm() {
    //alert('Showing new ticket form...');
    this.showNewTicketFormFlag = true;
    this.showMyRequestsTable = false;
    this.showAssignedRequestsTable = false;
  }
  onTicketCreated(ticket: any) {
    this.showNewTicketFormFlag = false;
  // Optionally refresh ticket lists or show a success message
  }
  fetchMyRequests() {
   // alert('Fetching my requests...');
    this.myticketService.getTicketsRaisedByCurrentUser().subscribe(tickets => {
      //console.log('My Tickets:', tickets);
      this.myTickets = tickets;
      this.showMyRequestsTable = true;
      this.showAssignedRequestsTable = false;
    });
  }
  fetchAssignedRequests() {
    // alert('Fetching assigned requests...');
    this.supportTicketService.getTicketsAssignedToCurrentAgent().subscribe(tickets => {
      //console.log('Assigned Tickets:', tickets);
      this.assignedTickets = tickets;
      this.showAssignedRequestsTable = true;
      this.showMyRequestsTable = false;
    });
  }

}
