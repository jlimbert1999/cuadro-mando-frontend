import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EarningService } from '../../services/earning.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  FormData: FormGroup = this.fb.group({
    ACTIVIDADES: ['', Validators.required],
    INMUEBLES: ['', Validators.required],
    TASAS: ['', Validators.required],
    VEHICULOS: ['', Validators.required],
    date: [new Date(), Validators.required]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private earningService: EarningService,
    public dialogRef: MatDialogRef<RegisterComponent>
  ) { }
  save() {
    this.earningService.addEarning(this.FormData.value).subscribe(earning => {
      this.dialogRef.close(earning)
    })
  }
}


