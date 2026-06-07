import { Component } from '@angular/core';
import {BookingStepsComponent} from '../../components/booking-steps/booking-steps.component';
import {
  BookingDetailsSidebarComponent
} from '../../components/booking-details-sidebar/booking-details-sidebar.component';
import {BookingFormComponent} from '../../components/booking-form/booking-form.component';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  imports: [
    BookingStepsComponent,
    BookingDetailsSidebarComponent,
    BookingFormComponent
  ],
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {}
