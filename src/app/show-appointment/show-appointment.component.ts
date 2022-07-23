import { Component, Inject ,OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface Appointment {
  firstName: string,
  lastName: string,
  email: string,
  gender?: string,
  age?: number,
  date: string,
  time: string
}

@Component({
  selector: 'app-show-appointment',
  templateUrl: './show-appointment.component.html',
  styleUrls: ['./show-appointment.component.css']
})
export class ShowAppointmentComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ShowAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Appointment,
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

}
