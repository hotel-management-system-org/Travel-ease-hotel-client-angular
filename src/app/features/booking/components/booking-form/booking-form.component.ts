import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CreateBookingRequestDto} from '../../../../dto/booking.dto';
import {BookingService} from '../../../../services/booking/booking';
import {ActivatedRoute} from '@angular/router';

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
  createBookingRequest:CreateBookingRequestDto | undefined;
  roomId:any = null;
  hotelId:any = null;

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
    console.log("Date:", date);

    const newDate = new Date(date);

    return newDate.toISOString().split('T')[0];
  }

  createBooking() {
    const firstName = this.form.value.firstName?.trim()!;
    const lastName = this.form.value.lastName?.trim()!;
    const guestEmail = this.form.value.email?.trim()!;
    const address = this.form.value.address?.trim()!;
    const city = this.form.value.city?.trim()!;
    const zipCode = this.form.value.zip?.trim()!;
    const guestPhone = this.form.value.phone?.trim()!;
    let quantity = null;
    let checkInDate = null;
    let checkOutDate = null;

     this.bookingService.getBookingData().subscribe((e)=>{
       quantity = e?.roomCount
       checkInDate = e?.checkIn
       checkOutDate = e?.checkOut
     },error => {
       console.log(error)
     });

     this.createBookingRequest = {
       roomId : this.roomId,
       quantity : quantity!,
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
     }

     this.bookingService.createBooking(this.createBookingRequest!).subscribe((e)=>{
       alert("Booking successfully created");
     }, error => {
      alert("Room is already booked");
     })
  }

}
