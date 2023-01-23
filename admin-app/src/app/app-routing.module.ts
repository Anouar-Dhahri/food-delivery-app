import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './views/login/login.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { DashboardComponent } from './views/dashboard/dashboard.component';

import { UsersComponent } from './views/users/users.component';

import { WorkersComponent } from './views/workers/workers.component';
import { WorkersFormComponent } from './views/workers-form/workers-form.component';

import { OrdersComponent } from './views/orders/orders.component';

import { RestaurentComponent } from './views/restaurent/restaurent.component';
import { RestaurentFormComponent } from './views/restaurent-form/restaurent-form.component';

import { FoodMenuComponent } from './views/food-menu/food-menu.component';
import { FoodMenuFormComponent } from './views/food-menu-form/food-menu-form.component';

import { ItemFormComponent } from './views/item-form/item-form.component';
import { ItemsComponent } from './views/items/items.component';

import { UserProfileComponent } from './views/user-profile/user-profile.component';

import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';

import { ValidOrderComponent } from './views/valid-order/valid-order.component';



const routes: Routes = [
  { path:'', component:LoginComponent, pathMatch:'full' },  
  { path:'admin', component:AdminLayoutComponent, 
    children:[
      { path:'dashboard', component:DashboardComponent },
      { path:'clients', component:UsersComponent },

      { path:'employees', component:WorkersComponent},
      { path:"employeesform/:action", component:WorkersFormComponent },
      { path:"employeesform/:action/:id", component:WorkersFormComponent },

      { path:'orders', component:OrdersComponent },
      { path:'validorder/:state/:id', component:ValidOrderComponent },
      
      { path:'restaurants', component:RestaurentComponent},
      { path:"restaurantform/:action", component:RestaurentFormComponent },
      { path:"restaurantform/:action/:id", component:RestaurentFormComponent },

      { path:'menus/:id', component:FoodMenuComponent},
      { path:"menusform/:action/:id", component:FoodMenuFormComponent },
      { path:"editmenus/:restaurantId/:action/:id", component:FoodMenuFormComponent },

      { path:"menuitem/:id", component:ItemsComponent },
      { path:"addmenuitem/:action/:id", component:ItemFormComponent },
      { path:"editmenuitem/:menuId/:action/:id", component:ItemFormComponent },

      { path:'profile', component:UserProfileComponent },
    ] 
  },{ path: '**', component: PageNotFoundComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
