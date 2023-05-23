import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.css']
})
export class ViewAppointmentComponent implements OnInit {
  appointments: any[] = [
    
  ]; // Dummy appointments data
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
   
    this.getAppointments().subscribe(
      (appointments: any[]) => {
        this.appointments = appointments;
      },
      (error) => {
        console.log('Error retrieving appointments:', error);
      }
    );

  }
  getAppointments(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/appointments');
  }

  
}
