import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-button-renderer',
  imports: [],
  template: `<button class="btn btn-primary btn-sm" (click)="onClick()">View</button>`,
  styleUrls: ['./view-button-renderer.scss']
})
export class ViewButtonRenderer implements ICellRendererAngularComp {
  params: any;

  constructor(private router: Router) {}

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    this.params = params;
    return true;
  }

  onClick() {
    const id = this.params.data.id;
    this.router.navigate(['/ticket'], { queryParams: { id } });
  }
}
