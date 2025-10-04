import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Myticketservice } from '../../shared/services/myticket/myticketservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'TicketDetailComponent',
  imports: [CommonModule],
  templateUrl: './ticket-detail.html',
  styleUrls: ['./ticket-detail.scss']
})
export class TicketDetailComponent {
  //id: string | null = null;
  @Input() id: string | null = null;
  // constructor(private route: ActivatedRoute) {

  // }
  // ngOnInit() {
  //   this.route.queryParams.subscribe(params => {
  //     this.id = params['id'];
  //   });
  // }

  ticket: any[]= [];

  constructor(
    private route: ActivatedRoute,
    private ticketService: Myticketservice
  ) {}

  ngOnInit() {
    //this.id = this.route.snapshot.paramMap.get('id');
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
