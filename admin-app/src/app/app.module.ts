import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';

import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { WorkersComponent } from './views/workers/workers.component';
import { WorkersFormComponent } from './views/workers-form/workers-form.component';
import { OrdersComponent } from './views/orders/orders.component';
import { UsersComponent } from './views/users/users.component';
import { UserProfileComponent } from './views/user-profile/user-profile.component';
import { FoodMenuComponent } from './views/food-menu/food-menu.component';
import { FoodMenuFormComponent } from './views/food-menu-form/food-menu-form.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { RestaurentComponent } from './views/restaurent/restaurent.component';
import { RestaurentFormComponent } from './views/restaurent-form/restaurent-form.component';
import { ItemFormComponent } from './views/item-form/item-form.component';
import { ItemsComponent } from './views/items/items.component';
import { ValidOrderComponent } from './views/valid-order/valid-order.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    WorkersComponent,
    WorkersFormComponent,
    OrdersComponent,
    UsersComponent,
    UserProfileComponent,
    FoodMenuComponent,
    FoodMenuFormComponent,
    AdminLayoutComponent,
    PageNotFoundComponent,
    RestaurentComponent,
    RestaurentFormComponent,
    ItemFormComponent,
    ItemsComponent,
    ValidOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatGridListModule,
    MatDatepickerModule,
    MatSnackBarModule,
    NgxMatFileInputModule,
    MatNativeDateModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
