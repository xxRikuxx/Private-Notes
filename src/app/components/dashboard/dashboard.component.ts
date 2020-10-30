import { Component, OnInit } from '@angular/core';
import {ToastsComponent} from '../../shared/toasts/toasts.component';
import {ToastService} from '../../toast.service';
import {AuthService} from '../../services/auth.service';
import {GridOptions} from 'ag-grid-community';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends ToastsComponent implements OnInit {
  columnDefs = [
    { field: 'title', sortable: true, filter: true, editable: true,   flex: 1, resizable: true},
    { field: 'description', sortable: true, filter: true, editable: true, flex: 2, resizable: true },
    { field: 'category', sortable: true, filter: true, editable: true,  flex: 1, resizable: true},
    { field: 'date', sortable: true, filter: true, editable: true,  flex: 1,  resizable: true}

  ];
  loremipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae felis ipsum. Pellentesque sem magna, maximus sed dui ac, venenatis vestibulum enim. Suspendisse scelerisque magna eget sapien tempor maximus. Etiam pretium sapien vel scelerisque suscipit. Cras mattis quam id leo mattis volutpat. Duis pellentesque et neque a lobortis. Maecenas mi lorem, congue vel est et, posuere varius sem. Quisque ullamcorper orci vestibulum aliquam posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;";
  rowData = [
    { title: 'Toyota', description: this.loremipsum, category: "foobar", date: "02/14/1999" },
    { title: 'Toyota', description: this.loremipsum, category: "foobar", date: "02/14/1999" },
    { title: 'Toyota', description: this.loremipsum, category: "foobar", date: "02/14/1999" },
    { title: 'Toyota', description: this.loremipsum, category: "foobar", date: "02/14/1999" },
    { title: 'Toyota', description: this.loremipsum, category: "foobar", date: "02/14/1999" },
    { title: 'Toyota', description: this.loremipsum, category: "foobar", date: "02/14/1999" },
    { title: 'Toyota', description: this.loremipsum, category: "foobar", date: "02/14/1999" },

  ];
  public gridOptions: GridOptions;
  constructor(public toastService: ToastService, public authService: AuthService) {
    super(toastService);
    const userDetails = this.authService.getUserDetails();
    console.log(userDetails);
    this.gridOptions = {
      rowData: this.rowData,
      columnDefs: this.columnDefs
    };
  }

  ngOnInit(): void {
    this.loggedIn('Peter');
  }

  getTableRecords(): void {

  }

  editRecord(key: string): void {

  }

  deleteRecord(key: string): void {

  }

}
