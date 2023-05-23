

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent  {

  appointmentForm: FormGroup;

 
  constructor(private formBuilder: FormBuilder,private http: HttpClient) {
    this.appointmentForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      age: ['', Validators.required],
      phone: ['', Validators.required],
      streetaddress:['', Validators.required],
      city:['', Validators.required],
      state:['', Validators.required],
      country:['', Validators.required],
      pincode:['', Validators.required],
      trainerPreference:['', Validators.required],
      package:['', Validators.required],
      weeks:['', Validators.required],
      amount:['', Validators.required],
      physioRequired:['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      
    });
  }

  submitAppointment() {
    console.log('try to submit')
    if (this.appointmentForm.valid) {
      // Here, you can perform further actions like sending the appointment data to an API or processing it in any other way.
      console.log(this.appointmentForm.value);
      this.http.post<any>('http://localhost:3000/appointments', this.appointmentForm.value)
        .subscribe((data) => {
          
          //this.appointmentForm.reset();
        });

      // Reset the form after submitting
     // this.appointmentForm.reset();
    } else {
      // Handle form validation errors
      console.log('Invalid form submission');
    }
  }

}
 

