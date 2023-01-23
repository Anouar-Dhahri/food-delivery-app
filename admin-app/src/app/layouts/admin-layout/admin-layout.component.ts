import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit{
  title = 'admin-layout';
  sideBarOpen = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') === null) {
      this.router.navigate(['']);
    }
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
