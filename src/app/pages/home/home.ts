import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Myticketservice } from '../../shared/services/myticket/myticketservice';
import { Supportticketservice } from '../../shared/services/support/supportticketservice';
import { CommonModule } from '@angular/common';
import { NewTicketForm,  } from '../../shared/components/new-ticket-form/new-ticket-form';
import { Authservice } from '../../shared/services/auth/authservice';
import { TicketList } from '../../shared/components/ticket-list/ticket-list';

@Component({
  selector: 'HomeDashboardComponent',
  imports: [FormsModule,CommonModule,NewTicketForm,TicketList],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeDashboardComponent {
  searchQuery = '';
  showMyRequestsTable = false;
  showAssignedRequestsTable = false;
  showSearchResultsTable = false;
  showNewTicketFormFlag = false;
  myTickets: any[] = [];
  assignedTickets: any[] = [];

  constructor(private myticketService: Myticketservice, private supportTicketService: Supportticketservice, private authservice: Authservice) {}

  searchRequests() {
    //alert(`Searching for: ${this.searchQuery}`);
    if(this.authservice.isLoggedIn() == false) {
      alert('Please log in to search tickets.');
      return;
    }
    else{
      this.myticketService.searchTickets(this.searchQuery).subscribe(results => {
        // Handle search results
        this.myTickets = results;
        this.showSearchResultsTable = true;
        this.showMyRequestsTable = this.showSearchResultsTable;
        this.showAssignedRequestsTable = false;
        this.showNewTicketFormFlag = false;
      });
    }
  }
  showNewTicketForm() {
    //alert('Showing new ticket form...');
    this.showNewTicketFormFlag = true;
    this.showMyRequestsTable = false;
    this.showAssignedRequestsTable = false;
    this.showSearchResultsTable = false;
    this.searchQuery = '';
  }
  onTicketCreated(ticket: any) {
    this.showNewTicketFormFlag = false;
  // Optionally refresh ticket lists or show a success message
    this.searchQuery = '';
  }
  fetchMyRequests() {
   // alert('Fetching my requests...');
    this.myticketService.getTicketsRaisedByCurrentUser().subscribe(tickets => {
      //console.log('My Tickets:', tickets);
      this.myTickets = tickets;
      this.showMyRequestsTable = true;
      this.showAssignedRequestsTable = false;
      this.showSearchResultsTable = false;
      this.showNewTicketFormFlag = false;
      this.searchQuery = '';
    });
  }
  fetchAssignedRequests() {
    // alert('Fetching assigned requests...');
    this.supportTicketService.getTicketsAssignedToCurrentAgent().subscribe(tickets => {
      //console.log('Assigned Tickets:', tickets);
      this.assignedTickets = tickets;
      this.showAssignedRequestsTable = true;
      this.showMyRequestsTable = false;
      this.showSearchResultsTable = false;
      this.showNewTicketFormFlag = false;
      this.searchQuery = '';
    });
  }

}
