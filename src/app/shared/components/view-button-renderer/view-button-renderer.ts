import { Component } from '@angular/core';

@Component({
  selector: 'app-view-button-renderer',
  imports: [],
  template: `<button class="btn btn-primary btn-sm" (click)="onView()">View</button>`,
  styleUrls: ['./view-button-renderer.scss']
})
export class ViewButtonRenderer {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  onView() {
    if (this.params.context && this.params.context.onViewTicket) {
      this.params.context.onViewTicket(this.params.data.id);
    }
  }
}
