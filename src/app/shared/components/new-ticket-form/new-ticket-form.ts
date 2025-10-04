import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-ticket-form',
  imports: [],
  templateUrl: './new-ticket-form.html',
  styleUrl: './new-ticket-form.scss'
})
export class NewTicketForm {
  @Output() ticketCreated = new EventEmitter<any>();
  formData: any = {};
  validationRules: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Fetch validation requirements from backend
    this.http.get('http://localhost:3000/ticket-validation').subscribe(rules => {
      this.validationRules = rules;
    });
  }

  submitForm() {
    // POST to backend to create ticket, backend generates ID
    this.http.post('http://localhost:3000/tickets', this.formData).subscribe((createdTicket: any) => {
      this.ticketCreated.emit(createdTicket);
    });
  }
}
