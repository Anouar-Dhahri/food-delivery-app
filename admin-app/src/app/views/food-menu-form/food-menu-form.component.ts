import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FoodmenuService } from 'src/app/services/foodmenu.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-food-menu-form',
  templateUrl: './food-menu-form.component.html',
  styleUrls: ['./food-menu-form.component.scss']
})
export class FoodMenuFormComponent implements OnInit {

  menuForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    day: new FormControl('', [Validators.required]),
  })
  id: string;
  restaurantId: string;
  operation: string;

  constructor(
    private foodmenuService: FoodmenuService, 
    private router: Router, 
    private activateRoute : ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) { 
    this.id = String(activateRoute.snapshot.paramMap.get('id')); 
    this.restaurantId = String(activateRoute.snapshot.paramMap.get('restaurantId'));
    this.operation = String(activateRoute.snapshot.paramMap.get('action')); 
  }

  titre = "Menu Form"

  ngOnInit(): void {
  }

  formAction(){
    console.log(this.menuForm)

    if(this.operation !=='edit') {
      this.foodmenuService.createMenu(
        this.menuForm.get('day')?.value, 
        this.menuForm.get('name')?.value,
        this.id,
      )
      .subscribe((data) => {
        if(data.success){
          this._snackBar.open(data.message, 'Done')
          this.router.navigate([`/admin/menus/${this.id}`]);
        }else {
          this._snackBar.open(data.message, 'Done')
        }
      });
    }else {
      this.foodmenuService.updateMenu(
        this.id,
        this.menuForm.get('jour')?.value, 
        this.menuForm.get('nom')?.value,
      )
      .subscribe((data) => {
        if(data.success){
          this._snackBar.open(data.message, 'Done')
          this.router.navigate([`/admin/menus/${this.restaurantId}`]);
        }else {
          this._snackBar.open(data.message, 'Done')
        }
      });
    }

  }

}
