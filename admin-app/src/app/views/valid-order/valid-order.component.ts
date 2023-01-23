import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employe } from 'src/app/interfaces/Employe';
import { WorkerService } from 'src/app/services/worker.service';
import { OrderService } from 'src/app/services/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-valid-order',
  templateUrl: './valid-order.component.html',
  styleUrls: ['./valid-order.component.scss']
})
export class ValidOrderComponent implements OnInit {

  validForm = new FormGroup({
    employe: new FormControl('', [Validators.required]),
  })

  titre = "Affecter Commande "
  state: string;
  id:string
  
  constructor(
    private orderService:OrderService,
    private workerService: WorkerService,
    private _snackBar: MatSnackBar, 
    private router: Router,
    private activateRoute: ActivatedRoute, 
  ) 
  {
    this.id = String(activateRoute.snapshot.paramMap.get('id'))
    this.state = String(activateRoute.snapshot.paramMap.get('state'))
  }

  employes:Employe[] = [];

  ngOnInit(): void {
    this.getListWorker();
  }

  getListWorker() {
    this.workerService.getListWorkerByState(this.state).subscribe((data) => {
      this.employes = data.employes
    })
  }

  formAction(){
    this.orderService.affectOrder(
      this.id,
      this.validForm.get('employe')?.value,
    )
    .subscribe((data) => {
      if(data.success){
        this._snackBar.open(data.message, 'Done')
        this.router.navigate(['/admin/orders']);
      }else {
        this._snackBar.open(data.message, 'Done')
      }
    });
  }
}
