import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  titre = "Profile"

  hide = true;

  id:any

  profileForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    let obj = localStorage.getItem('user')
    const user = JSON.parse(obj || '{}')
    //console.log(user.nom)
    this.id = user._id
  }

  submit() {
    this.authService.profile(
      this.profileForm.get('name')?.value,
      this.profileForm.get('surname')?.value,
      this.profileForm.get('email')?.value, 
      this.profileForm.get('password')?.value,
      this.id
    )
    .subscribe((data) => {
      if(data.success){
        this._snackBar.open(data.message, 'Done')
        localStorage.removeItem('user');
        localStorage.removeItem('token')
        this.router.navigate(['']);
      }else {
        this._snackBar.open(data.message, 'Done')
      }
    });
  }
}
