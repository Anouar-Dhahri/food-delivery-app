import { Component, OnInit } from '@angular/core';
import { Employe } from 'src/app/interfaces/Employe';
import { Restaurant } from 'src/app/interfaces/Restaurant';
import { Router } from '@angular/router';
import { WorkerService } from 'src/app/services/worker.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss']
})
export class WorkersComponent implements OnInit {

  constructor(
    private workerService: WorkerService, 
    private restaurantService: RestaurantService,
    private router: Router, 
    private _snackBar: MatSnackBar,
  ) { }

  titre = "Employees"

  displayedColumns: string[] = ['Name', 'Surname', 'Phone', 'Email', 'Restaurant', 'Available', 'Action'];
  
  dataSource:Employe[] = [];
  restaurants:Restaurant[] = [];

  status:Boolean = false

  ngOnInit(): void {
    this.getListWorker()
    this.getListRestaurent()
  }

  getListWorker() {
    this.workerService.getListWorker().subscribe((data) => {
      this.dataSource = data.employes
    })
  }
  getListRestaurent() {
    this.restaurantService.getListRestaurent().subscribe((data) => {
      this.restaurants = data.restaurants
    })
  }
  updateWorkerStat(id:string, available: boolean) {
    if(available == false) {
      this.status = true
    }else {
      this.status = false
    }
    this.workerService.updateWorkerStat(id, this.status).subscribe((data) => {
      if(data.success) {
        this.getListWorker()
        this._snackBar.open(data.message, 'Done');
      }else {
        this._snackBar.open(data.message, 'Done');
      }
    })
  }

  updateWorker(id:string) {
    this.router.navigate([`/admin/employeesform/edit/${id}`])
  }

  deleteWorker(id:string) {
    this.workerService.deleteWorker(id).subscribe((data) => {
      if(data.success) {
        this.getListWorker();
        this._snackBar.open(data.message, 'Done');
      }else {
        this._snackBar.open(data.message, 'Done');
      }
    })
  }

}
