import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent {

  constructor(public dialog: MatDialog) { }

  add() {
    this.dialog.open(RegisterComponent, {width:'800px'});
  }
}
