import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { WorkerService } from 'src/app/services/worker.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Restaurant } from 'src/app/interfaces/Restaurant';

@Component({
  selector: 'app-workers-form',
  templateUrl: './workers-form.component.html',
  styleUrls: ['./workers-form.component.scss']
})

export class WorkersFormComponent implements OnInit {

  hide = true;

  workerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    restaurantId: new FormControl('', [Validators.required]),
  })

  id: string;
  action: string;
  dataSource:Restaurant[] = [];

  constructor(
    private workerService:WorkerService,
    private RestaurantService: RestaurantService, 
    private router: Router, 
    private _snackBar: MatSnackBar,
    private activateRoute: ActivatedRoute, 
  ) { 
      this.id = String(activateRoute.snapshot.paramMap.get('id'));
      this.action = String(activateRoute.snapshot.paramMap.get('action'));
    }

  titre = "Employees Form"

  ngOnInit(): void {
    if (this.action == "add") {
      console.log("add");
    }else {
      console.log("add");
    }
    this.getListRestaurent()
  }

  getListRestaurent() {
    this.RestaurantService.getListRestaurent().subscribe((data) => {
      this.dataSource = data.restaurants
    })
  }

  formAction(){
    console.log(this.workerForm)

    if(this.action == "edit") {
      this.workerService.updateWorker(
        this.id,
        this.workerForm.get('name')?.value, 
        this.workerForm.get('surname')?.value,
        this.workerForm.get('phone')?.value, 
        this.workerForm.get('email')?.value,
        this.workerForm.get('password')?.value, 
        this.workerForm.get('state')?.value,
        this.workerForm.get('restaurantId')?.value
      )
      .subscribe((data) => {
        if(data.success){
          this._snackBar.open(data.message, 'Done')
          this.router.navigate(['/admin/workers']);
          //window.open(data.preview, '_blank')
        }else {
          this._snackBar.open(data.message, 'Done')
        }
      });
    }else {
      this.workerService.createWorker(
        this.workerForm.get('name')?.value, 
        this.workerForm.get('surname')?.value,
        this.workerForm.get('phone')?.value, 
        this.workerForm.get('email')?.value,
        this.workerForm.get('password')?.value, 
        this.workerForm.get('state')?.value,
        this.workerForm.get('restaurantId')?.value
      )
      .subscribe((data) => {
        if(data.success){
          this._snackBar.open(data.message, 'Done')
          this.router.navigate(['/admin/workers']);
          //window.open(data.preview, '_blank')
        }else {
          this._snackBar.open(data.message, 'Done')
        }
      });
    }

  }
}
