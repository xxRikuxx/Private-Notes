import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams} from 'ag-grid-community';

@Component({
  selector: 'app-delete-btn',
  templateUrl: './delete-btn.component.html',
  styleUrls: ['./delete-btn.component.scss']
})
export class DeleteBtnComponent implements ICellRendererAngularComp {
  private params: any;
  public cell: any;
  constructor() { }


  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.cell = {row: params.value, col: params.colDef.headerName};
  }

  refresh(params: any): boolean {
    return false;
  }
  public clicked(cell: any): void {
    if (this.params.onClick instanceof  Function) {
      const params = {
        event: cell,
        rowData: this.params.node.data
      };
      this.params.onClick(params);
    }
  }
}
