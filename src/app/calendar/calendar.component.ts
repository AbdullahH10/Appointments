import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { NewAppointmentComponent } from '../new-appointment/new-appointment.component';
import { ShowAppointmentComponent } from '../show-appointment/show-appointment.component';

export interface Appointment {
  firstName: string,
  lastName: string,
  email: string,
  gender?: string,
  age?: number,
  date: string,
  time: string
}
export interface monthData {
  date: string;
  appointmentList?: Appointment[]
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.populateCalendar();
  }

  selectedMonth: string = new Date().toLocaleDateString('en-us', { month: 'long' });
  
  months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  weekdays: string[] = [
    "Sunday",
    "Monday",
    "Wednesday",
    "Tuesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  monthData: monthData[] = [];

  openNewAppointmentDialog(): void {
    this.dialog.open(NewAppointmentComponent, {
      width: '500px',
    }) 
  }

  populateCalendar(): void {

    this.monthData = [];

    let curDate: Date = new Date();
    let year: number = curDate.getFullYear();

    let firstDayOfMonth: string = new Date(year, this.months.indexOf(this.selectedMonth), 1)
      .toLocaleDateString('en-us', {
        weekday: 'long'
      });

    let daysOfMonth: number = new Date(year, this.months.indexOf(this.selectedMonth) + 1, 0)
      .getDate();

    let paddingDays: number = this.weekdays.indexOf(firstDayOfMonth);

    let appointments: Appointment[] = [];

    if(localStorage.getItem("appointments") !== null){
      appointments = JSON.parse(localStorage.getItem("appointments")!);
    }

    for (let i = 1; i <= daysOfMonth + paddingDays; i++) {
      if (i <= paddingDays) {
        //console.log(daysOfMonth + " " + firstDayOfMonth);
        this.monthData.push({date: " "});
      }
      else {
        //console.log(i);
        let curDateAppointments: Appointment[] = [];
        let dateString = `${i-paddingDays}/${this.months.indexOf(this.selectedMonth)+1}/${year}`;
        console.log(dateString);
        
        appointments.forEach(element => {
          if(element.date === dateString){
            console.log(element.date+" "+dateString);
            
            curDateAppointments.push(element);
          }
        });
        this.monthData.push({
          date: `${i-paddingDays}`,
          appointmentList: curDateAppointments
        })
      }
    }
  }

  openShowAppointmentDialog(): void {
    this.dialog.open(ShowAppointmentComponent, {
      width: '500px',
      data: {

      }
    })
  }
}
