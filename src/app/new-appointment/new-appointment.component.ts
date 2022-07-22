import { Component, Inject, OnInit } from '@angular/core';
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
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.css']
})
export class NewAppointmentComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NewAppointmentComponent>
  ) { }

  ngOnInit(): void {
  }

  firstName: string = "";
  lastName: string = "";
  email: string = "";
  gender: string = "";
  age: number = 0;
  date: string = "";
  time: string = "";

  saveAppointment(): void {
    let appointment: Appointment = {
      firstName : this.firstName,
      lastName : this.lastName,
      email : this.lastName,
      gender : this.gender,
      age : this.age,
      date : this.date,
      time : this.time
    }
    let appointments: Appointment[] = localStorage.getItem("appointments")?
    JSON.parse(localStorage.getItem("appointments")!):
    [];
    appointments.push(appointment);
    localStorage.setItem("appointments",JSON.stringify(appointments));
    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
