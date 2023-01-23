import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/interfaces/Menu';
import { Restaurant } from 'src/app/interfaces/Restaurant';
import { FoodmenuService } from 'src/app/services/foodmenu.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-food-menu',
  templateUrl: './food-menu.component.html',
  styleUrls: ['./food-menu.component.scss']
})

export class FoodMenuComponent implements OnInit {

  titre = "Menus"
  displayedColumns: string[] = ['Id', 'Day', 'Name', 'Restaurant', 'Action'];
  dataSource:Menu[] = [] 
  restaurants:Restaurant[] = [];
  id: string;

  constructor(
    private foodmenuService: FoodmenuService, 
    private restaurantService: RestaurantService,
    private router: Router, 
    private activateRoute : ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) { this.id = String(activateRoute.snapshot.paramMap.get('id')); }

  ngOnInit(): void {
    this.getListMenu();
    this.getListRestaurent()
  }

  addMenuForm() {
    this.router.navigate([`/admin/menusform/add/${this.id}`])
  }

  getListMenu() {
    this.foodmenuService.getListMenu(this.id).subscribe((data) => {
      this.dataSource = data.menus
    })
  }

  getListRestaurent() {
    this.restaurantService.getListRestaurent().subscribe((data) => {
      this.restaurants = data.restaurants
    })
  }
  
  getMenuItems(id: string) {
    this.router.navigate([`/admin/menuitem/${id}`])
  }

  updateFoodMenu(id:string, restaurentId:string) {
    this.router.navigate([`/admin/editmenus/${restaurentId}/edit/${id}`])
  }

  deleteFoodMenu(id:string) {
    this.foodmenuService.deleteMenu(id).subscribe((data) => {
      if(data.success) {
        this.getListMenu();
        this._snackBar.open(data.message, 'Done');
      }else {
        this._snackBar.open(data.message, 'Done');
      }
    })
  }

}
