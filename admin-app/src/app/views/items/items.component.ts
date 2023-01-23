import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/interfaces/Item';
import { Menu } from 'src/app/interfaces/Menu';
import { ItemService } from 'src/app/services/item.service';
import { FoodmenuService } from 'src/app/services/foodmenu.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  titre = "Items"
  displayedColumns: string[] = ['Id', 'Image', 'Name', 'Price', 'Menu','Action'];
  dataSource:Item[] = [] 
  menus:Menu[] = [] 
  id: string;

  constructor(
    private foodmenuService: FoodmenuService, 
    private itemService: ItemService, 
    private router: Router, 
    private activateRoute : ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) { this.id = String(activateRoute.snapshot.paramMap.get('id')); }

  ngOnInit(): void {
    this.getListItem();
    this.getAllMenu()
  }

  addItemForm() {
    this.router.navigate([`/admin/addmenuitem/add/${this.id}`])
  }

  getListItem() {
    this.itemService.getListItem(this.id).subscribe((data) => {
      this.dataSource = data.items
    })
  }
  
  getAllMenu() {
    this.foodmenuService.getAllMenu().subscribe((data) => {
      this.menus = data.menus
    })
  }

  updateMenuItem(id:string, menuId:string) {
    this.router.navigate([`/admin/editmenuitem/${menuId}/edit/${id}`])
  }

  deleteMenuItem(id:string) {
    this.itemService.deleteItem(id).subscribe((data) => {
      if(data.success) {
        this.getListItem();
        this._snackBar.open(data.message, 'Done');
      }else {
        this._snackBar.open(data.message, 'Done');
      }
    })
  }

}
