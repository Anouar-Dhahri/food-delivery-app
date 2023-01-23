import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemService } from 'src/app/services/item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {

  itemForm = new FormGroup({
    image: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  })
  titre = "Menu Item Form"
  id: string;
  menuId: string;
  operation: string;

  constructor(
    private itemService: ItemService, 
    private router: Router, 
    private activateRoute : ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) 
  { 
    this.id = String(activateRoute.snapshot.paramMap.get('id')); 
    this.menuId = String(activateRoute.snapshot.paramMap.get('menuId'));
    this.operation = String(activateRoute.snapshot.paramMap.get('action')); 
  
  }

  ngOnInit(): void {
  }

  formAction(){
    console.log(this.itemForm)

    if(this.operation !=='edit') {
      this.itemService.createItem(
        this.itemForm.get('image')?.value, 
        this.itemForm.get('name')?.value,
        this.itemForm.get('price')?.value,
        this.id,
      )
      .subscribe((data) => {
        if(data.success){
          this._snackBar.open(data.message, 'Done')
          this.router.navigate([`/admin/menuitem/${this.id}`]);
        }else {
          this._snackBar.open(data.message, 'Done')
        }
      });
    }else {
      this.itemService.updateItem(
        this.id,
        this.itemForm.get('image')?.value, 
        this.itemForm.get('name')?.value,
        this.itemForm.get('price')?.value,
        this.menuId,
      )
      .subscribe((data) => {
        if(data.success){
          this._snackBar.open(data.message, 'Done')
          this.router.navigate([`/admin/menuitem/${this.menuId}`]);
        }else {
          this._snackBar.open(data.message, 'Done')
        }
      });
    }
  }

}
