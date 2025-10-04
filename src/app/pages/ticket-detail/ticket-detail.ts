import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'TicketDetailComponent',
  imports: [],
  templateUrl: './ticket-detail.html',
  styleUrls: ['./ticket-detail.scss']
})
export class TicketDetailComponent {
  id: number | undefined;
  constructor(private route: ActivatedRoute) {

  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }
}
