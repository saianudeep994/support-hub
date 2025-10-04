import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Supportticketservice } from '../../services/support/supportticketservice';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { TicketDetailComponent } from '../../../pages/ticket-detail/ticket-detail';
//import { ViewButtonRenderer } from './view-button-renderer';
import { buffer } from 'rxjs';

@Component({
  selector: 'app-ticket-list',
  imports: [CommonModule, AgGridAngular, TicketDetailComponent],
  templateUrl: './ticket-list.html',
  styleUrls: ['./ticket-list.scss']
})
export class TicketList implements OnInit {
  @Input() assignedTickets: any[] = [];
  @Input() myTickets: any[] = [];
  searchQuery = '';
  @Input() showMyRequestsTable = false;
  @Input() showAssignedRequestsTable = false;
  showSearchResultsTable = false;
  showNewTicketFormFlag = false;
  selectedTicketId: string = '';

  rowData: any[] = [];
  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', sortable: true, filter: true },
    { field: 'title', headerName: 'Title', sortable: true, filter: true },
    { field: 'customerId', headerName: 'Created By', sortable: true, filter: true },
    { field: 'agentId', headerName: 'Assigned To', sortable: true, filter: true },
    { field: 'status', headerName: 'Status', sortable: true, filter: true },
    { field: 'createdAt', headerName: 'Created At', sortable: true, filter: true },
    {
      headerName: 'Actions',
      field: 'actions',
      width: 165,
      cellRenderer: `<button class="btn btn-primary btn-sm" (click)="onView()">View</button>`,
    }
  ];
  gridContext = {
    onViewTicket: (id: string) => this.showTicketDetail(id)
  };
  
  showTicketDetail(id: string) {
    this.selectedTicketId = id;
  }
  
  defaultColDef = { resizable: true };

  ngOnInit() {
    if (this.showMyRequestsTable) {
      this.rowData = this.myTickets;
    } else if (this.showAssignedRequestsTable) {
      this.rowData = this.assignedTickets;
    }
  }

  ngOnChanges() {
    if (this.showMyRequestsTable) {
      this.rowData = this.myTickets;
    } else if (this.showAssignedRequestsTable) {
      this.rowData = this.assignedTickets;
    }
  }
 
}
