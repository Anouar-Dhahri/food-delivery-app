import { Component, OnInit, Inject } from '@angular/core';
import { Order } from 'src/app/interfaces/Order';
import { OrderService } from 'src/app/services/order.service';

import { WorkerService } from 'src/app/services/worker.service';
import { Employe } from 'src/app/interfaces/Employe';

import { Restaurant } from 'src/app/interfaces/Restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';

import { Client } from 'src/app/interfaces/Client';
import { UserService } from 'src/app/services/user.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnInit {

  constructor(
    private workerService: WorkerService, 
    private orderService:OrderService,
    private restaurantService: RestaurantService,
    private userService: UserService, 
    private _snackBar: MatSnackBar, 
    private router: Router, 
    private activateRoute : ActivatedRoute,
  ) { }

  titre = "Commandes"
  displayedColumns: string[] = ['Ref', 'Client', 'Restaurant', 'State','Price', 'Status', 'Employe','Action'];
  dataSource:Order[]= [];
  workers:Employe[] = [];
  clients:Client[] = [];
  restaurants: Restaurant[]= []
  statut = true

  ngOnInit(): void {
    this.getListOrder()
    this.getListWorker()
    this.getListRestaurent();
    this.getListClient()
  }

  getListWorker() {
    this.workerService.getListWorker().subscribe((data) => {
      this.workers = data.employes
    })
  }

  getListOrder() {
    this.orderService.getListOrder().subscribe((data) => {
      this.dataSource = data.orders;
    })
  }

  getListRestaurent() {
    this.restaurantService.getListRestaurent().subscribe((data) => {
      this.restaurants = data.restaurants
    })
  }

  getListClient(){
    this.userService.getListClients().subscribe((data) => {
      this.clients = data.clients
    })
  }

  validateOrder(id:string, status:boolean) {
    if(status) {
      this._snackBar.open('Le Commande déja valide', 'Done')
    }else {
      this.orderService.validateOrder(id, this.statut).subscribe((data) => {
        if(data.success) {
          this.getListOrder()
          this._snackBar.open(data.message, 'Done');
        }else {
          this._snackBar.open(data.message, 'Done');
        }
      })
    }
  }

  AffectOrder(id:string, etat:string):void {
    this.router.navigate([`/admin/validorder/${etat}/${id}`])
  }

  deleteOrder(id:string) {
    this.orderService.deleteOrder(id).subscribe((data) => {
      if(data.success) {
        this.getListOrder();
        this._snackBar.open(data.message, 'Done');
      }else {
        this._snackBar.open(data.message, 'Done');
      }
    })
  }

}
