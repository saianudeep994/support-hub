import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Authservice } from '../../services/auth/authservice';

@Component({
  selector: 'app-new-ticket-form',
  imports: [FormsModule],
  templateUrl: './new-ticket-form.html',
  styleUrl: './new-ticket-form.scss'
})
export class NewTicketForm {
  @Output() ticketCreated = new EventEmitter<any>();
  formData: any = {};
  validationRules: any = {};

  constructor(private http: HttpClient, private authService: Authservice) {}

  ngOnInit() {
    // Fetch validation requirements from backend
    this.http.get('http://localhost:3000/ticket-validation').subscribe(rules => {
      this.validationRules = rules;
    });
  }

  submitForm() {
    // POST to backend to create ticket, backend generates ID
    this.formData.priority = this.formData.priority || '2'; // Default priority
    this.formData.status = 'Open'; // Default status
    this.formData.customerId = this.authService.getCurrentUser().id; // Replace with actual current user ID
    this.formData.agentId = null; // Initially unassigned
    this.formData.createdAt = new Date().toISOString();
    this.formData.updatedAt = new Date().toISOString();
    this.formData.isDeleted = false;
    this.http.post('http://localhost:3000/tickets', this.formData).subscribe((createdTicket: any) => {
      this.ticketCreated.emit(createdTicket);
    });
  }
}

