import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-config-date',
  templateUrl: './config-date.component.html',
  styleUrls: ['./config-date.component.css']
})
export class ConfigDateComponent {
  dateEarning: Date = new Date()
  dateExecution: Date = new Date()
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _bottomSheetRef: MatBottomSheetRef<ConfigDateComponent>
  ) {
  }

  save() {
    this._bottomSheetRef.dismiss({ dateEarning: this.dateEarning, dateExecution: this.dateExecution })
  }

}
