import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ViewAppointmentComponent } from './view-appointment.component';
import { HttpClient } from '@angular/common/http';

describe('ViewAppointmentComponent', () => {
  let component: ViewAppointmentComponent;
  let fixture: ComponentFixture<ViewAppointmentComponent>;
  let httpTestingController: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAppointmentComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();
    fixture = TestBed.createComponent(ViewAppointmentComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
  });
 
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch appointments from the API and display them in the table', () => {
    const mockAppointments = [
      { fname: 'John', lname: 'Doe', email: 'johndoe@example.com' },
      { fname: 'Jane', lname: 'Smith', email: 'janesmith@example.com' }
    ];

    component.ngOnInit();

    const req = httpTestingController.expectOne('http://localhost:3000/appointments');
    expect(req.request.method).toBe('GET');

    req.flush(mockAppointments);

    expect(component.appointments).toEqual(mockAppointments);

    fixture.detectChanges();
    const tableRows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(tableRows.length).toBe(2);
    expect(tableRows[0].textContent).toContain('John');
    expect(tableRows[1].textContent).toContain('Jane');
  });
});
