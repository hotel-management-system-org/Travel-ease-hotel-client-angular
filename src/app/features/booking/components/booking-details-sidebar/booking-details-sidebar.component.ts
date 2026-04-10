import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ResponseHotelDto, ResponseRoomDto} from '../../../../dto/hotel.response';
import {Subject, takeUntil} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Hotel} from '../../../../services/hotel/hotel';
import {NgForOf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {BookingService, BookingState} from '../../../../services/booking/booking';

@Component({
  selector: 'app-booking-details-sidebar',
  templateUrl: './booking-details-sidebar.component.html',
  imports: [
    NgForOf,
    MatIcon,

  ],
  styleUrls: ['./booking-details-sidebar.component.scss']
})
export class BookingDetailsSidebarComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
      throw new Error('Method not implemented.');
  }
  room!: ResponseRoomDto;
  private destroy$ = new Subject<void>();
  route = inject(ActivatedRoute);
  hotelService = inject(Hotel);
  bookingService = inject(BookingService);
  hotel: ResponseHotelDto | undefined;
  id: any = null;
  hotelId: any = null;
  bookingDetails: BookingState|undefined;



  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("roomId");
    this.hotelId = this.route.snapshot.paramMap.get("hotelId");

    this.bookingService.getBookingData().subscribe(data => {

      this.bookingDetails = data!;

      console.log("BOOKING DETAILS SIDE BAR ", this.bookingDetails.checkIn + "|" + this.bookingDetails.checkOut);
    })

    this.getRoomDetails();
    this.getHotelDetails();
  }

  getHotelDetails(): void {
    this.hotelService.findById(this.hotelId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: data => {
          console.log("data", data);
          this.hotel = data;

        },
        error: err => {
          console.log(err);
        }
      })
  }

  getRoomDetails(): void {
    this.hotelService.findRoomBYId(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: data => {
          this.room = data;
        },
        error: err => {
          console.log(err);
        }
      })
  }
}
