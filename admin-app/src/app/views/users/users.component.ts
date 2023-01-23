import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Client } from 'src/app/interfaces/Client';
import { UserService } from 'src/app/services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
//import {MatPaginator} from '@angular/material/paginator';
//import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private userService : UserService, private _snackBar: MatSnackBar) { }

  titre="Clients"
  status = true
  displayedColumns: string[] = ['Name', 'Surname', 'Email', 'State', 'Enabled','Date', "Action"];
  dataSource:Client[] = [];

  ngOnInit(): void {
    this.getListClient()
  }

  getListClient(){
    this.userService.getListClients().subscribe((data) => {
      this.dataSource = data.clients
    })
  }

  activateUser(id:string, status:boolean) {
    if(status) {
      this._snackBar.open('Account already enabled', 'Done')
    }else {
      this.userService.activateClient(id, this.status).subscribe((data) => {
        if(data.success) {
          this.getListClient()
          this._snackBar.open(data.message, 'Done');
        }else {
          this._snackBar.open(data.message, 'Done');
        }
      })
    }
  }

  deleteUser(id:string) {
    this.userService.deleteClients(id).subscribe((data) => {
      if(data.success) {
        this.getListClient();
        this._snackBar.open(data.message, 'Done');
      }else {
        this._snackBar.open(data.message, 'Done');
      }
    })
  }
}
