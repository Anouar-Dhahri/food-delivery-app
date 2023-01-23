import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-restaurent-form',
  templateUrl: './restaurent-form.component.html',
  styleUrls: ['./restaurent-form.component.scss']
})
export class RestaurentFormComponent implements OnInit {

  restaurentForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    speciality: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
  });

  id: string;
  action: string;

  constructor(
    private restaurantService: RestaurantService, 
    private router: Router, 
    private _snackBar: MatSnackBar,
    private activateRoute: ActivatedRoute, 
  ) { 
      this.id = String(activateRoute.snapshot.paramMap.get('id'));
      this.action = String(activateRoute.snapshot.paramMap.get('action'));
    }

  titre = "Restaurents Form"

  ngOnInit(): void {
    if(this.action == 'add'){
      console.log("add")
    }else {
      console.log("edit")
    }
  }

  formAction(){
    console.log(this.restaurentForm)
    if(this.action == "add" ) {
      this.restaurantService.createRestaurent(
        this.restaurentForm.get('name')?.value, 
        this.restaurentForm.get('state')?.value,
        this.restaurentForm.get('image')?.value, 
        this.restaurentForm.get('speciality')?.value,
        this.restaurentForm.get('address')?.value, 
        this.restaurentForm.get('phone')?.value
      )
      .subscribe((data) => {
        if(data.success){
          this._snackBar.open(data.message, 'Done')
          this.router.navigate(['/admin/restaurants']);
        }else {
          this._snackBar.open(data.message, 'Done')
        }
      });
    }else {
      this.restaurantService.updateRestaurent(
        this.id,
        this.restaurentForm.get('name')?.value, 
        this.restaurentForm.get('state')?.value,
        this.restaurentForm.get('image')?.value, 
        this.restaurentForm.get('speciality')?.value,
        this.restaurentForm.get('address')?.value, 
        this.restaurentForm.get('phone')?.value
      )
      .subscribe((data) => {
        if(data.success){
          this._snackBar.open(data.message, 'Done')
          this.router.navigate(['/admin/restaurants']);
        }else {
          this._snackBar.open(data.message, 'Done')
        }
      });
    }
  }
}
