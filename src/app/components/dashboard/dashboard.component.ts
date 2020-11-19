import {Component, OnInit} from '@angular/core';
import {ToastsComponent} from '../../shared/toasts/toasts.component';
import {ToastService} from '../../toast.service';
import {AuthService} from '../../services/auth.service';
import {GridOptions} from 'ag-grid-community';
import {DataService} from '../../services/data.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {not} from 'rxjs/internal-compatibility';
import {DELETE} from '@angular/cdk/keycodes';
import {DeleteBtnComponent} from './delete-btn/delete-btn.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends ToastsComponent implements OnInit {
  columnDefs = [
    {field: 'title', sortable: true, filter: true, editable: true, flex: 1, resizable: true},
    {field: 'description', sortable: true, filter: true, editable: true, flex: 3, resizable: true},
    {field: 'category', sortable: true, filter: true, editable: true, flex: 1, resizable: true},
    {field: 'date', sortable: true, filter: true, editable: true, flex: 2, resizable: true},
    {
      headerName: '',
      field: 'name',
      cellRendererFramework: DeleteBtnComponent,
      cellRendererParams: {
        onClick: this.deleteRecord.bind(this)
      },
      resizable: false,
      maxWidth: 80
    }

  ];
  private gridAPI;
  loremipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae felis ipsum. Pellentesque sem magna, maximus sed dui ac, venenatis vestibulum enim. Suspendisse scelerisque magna eget sapien tempor maximus. Etiam pretium sapien vel scelerisque suscipit. Cras mattis quam id leo mattis volutpat. Duis pellentesque et neque a lobortis. Maecenas mi lorem, congue vel est et, posuere varius sem. Quisque ullamcorper orci vestibulum aliquam posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;';
  rowData = [];

  public gridOptions: GridOptions;
  constructor(private db: AngularFireDatabase, private dataService: DataService, public toastService: ToastService, public authService: AuthService) {
    super(toastService);
    const userDetails = this.authService.getUserDetails();

    console.log(userDetails);
    const notes = db.list('/notes').valueChanges();
    this.gridOptions = {
      columnDefs: this.columnDefs,
      rowData: this.rowData
    };
    // tslint:disable-next-line:no-shadowed-variable
    notes.subscribe(notes => {
      console.log(notes);
      this.rowData.push(notes);
      this.gridAPI.setRowData([...notes]);
      console.log(notes);
    });

  }

  ngOnInit(): void {
    this.loggedIn();
    console.log(this.gridOptions);
  }

  getTableRecords(): void {

  }

  editRecord(key: string): void {

  }

  deleteRecord({rowData}: any): void {
    const db = this.db.database.ref();
    const query = this.db.database.ref('/notes').orderByKey();
    query.once('value')
      .then((snap) => {
        snap.forEach((child) => {
          const key = child.key;
          const value = child.val();
          if (value.date === rowData.date) {
            db.child(`/notes/${key}`).remove().then(r => console.log(r));
            this.showSuccess('Deleted Note');
            return true;
          }
        });
      }, err => {
        this.showDanger('Failed To Delete Note');
      });
    // query.once("value")
  }

  onGridReady(params: any) {
    this.gridAPI = params.api;
  }

}
