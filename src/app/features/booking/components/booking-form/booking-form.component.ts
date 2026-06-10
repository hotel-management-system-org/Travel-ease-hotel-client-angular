import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CreateBookingRequestDto} from '../../models/booking.dto';
import {BookingService} from '../../services/booking.service';
import {ActivatedRoute} from '@angular/router';
import { v4 as uuid4 } from 'uuid';
import {switchMap, take} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit{

  bookingService = inject(BookingService);
  route = inject(ActivatedRoute);
  roomId:any = null;
  hotelId:any = null;
  isSubmitting = false;

  form = new FormGroup({

    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(/^[A-Za-z]+$/)
    ]),

    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(/^[A-Za-z]+$/)
    ]),

    email: new FormControl('',
      [Validators.email,Validators.required,
        Validators.minLength(3)]),

    address: new FormControl('',[
      Validators.required
    ]),

    city: new FormControl('',[
      Validators.required
    ]),

    zip: new FormControl('',[
      Validators.required
    ]),

    phone: new FormControl('',
      [Validators.required,
        Validators.minLength(10)]),

  })
  ngOnInit(): void {
    this.hotelId = this.route.snapshot.paramMap.get("hotelId");
    this.roomId = this.route.snapshot.paramMap.get("roomId");

  }

  formatDate(date: any): string {
    if (!date) return '';
    const newDate = new Date(date);
    return newDate.toISOString().split('T')[0];
  }

  createBooking() {
    if (this.form.invalid || this.isSubmitting){
      return;
    }
    this.isSubmitting = true;
    const idempotencyKey = uuid4()
    const firstName = this.form.value.firstName?.trim()!;
    const lastName = this.form.value.lastName?.trim()!;
    const guestEmail = this.form.value.email?.trim()!;
    const address = this.form.value.address?.trim()!;
    const city = this.form.value.city?.trim()!;
    const zipCode = this.form.value.zip?.trim()!;
    const guestPhone = this.form.value.phone?.trim()!;
    let checkInDate = null;
    let checkOutDate = null;

     this.bookingService.getBookingData().pipe(
       take(1),
        switchMap((bookingData) => {
        const createBookingRequest: CreateBookingRequestDto = {
              roomId : this.roomId,
              quantity : bookingData?.roomCount ?? 1,
              totalPrice : 10000,
              firstName : firstName,
              lastName : lastName,
              zipCode : zipCode,
              address : address,
              city : city,
              hotelId : this.hotelId,
              guestEmail : guestEmail,
              guestPhone : guestPhone,
              checkIn : this.formatDate(checkInDate!),
              checkOut : this.formatDate(checkOutDate!),
            };
        return this.bookingService.createBooking(createBookingRequest, idempotencyKey);
        })
       ).subscribe({
       next: () => {
         alert("Booking successfully created");
         this.isSubmitting = false;
       },
       error: (error: HttpErrorResponse) => {
         let errorMessage = 'Booking failed due to a system error. Please try again.';
         if (error.error && error.error.message){
           errorMessage = error.error.message;
         }else if (error.status === 409) {
           errorMessage = 'Duplicate request detected. Processing your booking already.';
         }
         alert(errorMessage);
         this.isSubmitting = false;
       }
     })
  }
}
