import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Supportticketservice } from '../../services/support/supportticketservice'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticket-detail',
  imports: [CommonModule],
  templateUrl: './ticket-detail.html',
  styleUrls: ['./ticket-detail.scss']
})
export class TicketDetail {
  ticket: any;

  constructor(
    private route: ActivatedRoute,
    private ticketService: Supportticketservice
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.ticketService.getTicketById(id).subscribe(ticket => {
        this.ticket = ticket;
      });
    } else {
      // Handle the case where id is null, e.g., show an error or set ticket to null
      this.ticket = null;
    }
  }
}
