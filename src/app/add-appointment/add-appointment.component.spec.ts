import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AddAppointmentComponent } from './add-appointment.component';

describe('AddAppointmentComponent', () => {
  let component: AddAppointmentComponent;
  let fixture: ComponentFixture<AddAppointmentComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAppointmentComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule]
    }).compileComponents();
  
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should send a POST request to the API when the form is submitted', fakeAsync(() => {
    const form = component.appointmentForm;
    form.get('fname')?.setValue('John');
    form.get('lname')?.setValue('Doe');
    form.get('age')?.setValue(30);
    form.get('phone')?.setValue('87897');
      form.get('streetaddress')?.setValue('test');
      form.get('city')?.setValue('test');
      form.get('state')?.setValue('test');
      form.get('country')?.setValue('test');
      form.get('pincode')?.setValue('878');
      form.get('trainerPreference')?.setValue('Male');
      form.get('package')?.setValue('Package 1');
      form.get('weeks')?.setValue('3');
      form.get('amount')?.setValue('45');
      form.get('physioRequired')?.setValue('No');
      form.get('email')?.setValue('abc@gmail.com');
    // TODO: ... set values for other fields

    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    console.log('click')
    submitButton.click();

    tick();

    const req = httpTestingController.expectOne('http://localhost:3000/appointments');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(form.value);

     
  }));

  it('should not send a POST request to the API when the form is invalid', fakeAsync(() => {
    const form = component.appointmentForm;
    form.get('fname')?.setValue('John');

    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    submitButton.click();

    tick();

    httpTestingController.expectNone('http://localhost:3000/appointments');
    //expect(component.appointments.length).toBe(0);
  }));
});
