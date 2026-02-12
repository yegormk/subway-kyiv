import { Component, inject } from '@angular/core';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA, MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle
} from '@angular/material/dialog';

@Component({
  selector: 'app-station-info',
  imports: [
    MatDialogModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatButton,
  ],
  templateUrl: './station-info.html',
  styleUrl: './station-info.scss',
})
export class StationInfo {
  data = inject(MAT_DIALOG_DATA);
}
