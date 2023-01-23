import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  user:any
  constructor( private router: Router) { }

  ngOnInit(): void {
    this.getUser()
  }
  
  getUser() {
    let obj = localStorage.getItem('user')
    const user = JSON.parse(obj || '{}')
    console.log(user.nom)
    this.user = user
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  logout(){
    localStorage.removeItem('user');
    localStorage.removeItem('token')
    this.router.navigate(['']);
  }

}
