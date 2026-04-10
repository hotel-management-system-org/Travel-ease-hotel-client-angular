import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreateBookingRequestDto } from '../../dto/booking.dto';
import { BehaviorSubject, catchError, Observable, retry, throwError } from 'rxjs';
import { v4 as uuid } from 'uuid';


export interface BookingState {
  checkIn: string;
  checkOut: string;
  roomCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private baseUrl: string = environment.baseUrl + "/booking-service/api/bookings";
  private http = inject(HttpClient);


  private bookingDataSubject = new BehaviorSubject<BookingState | null>(null);


  setBookingData(data: BookingState) {
    console.log("Room count " , data.roomCount);
    this.bookingDataSubject.next(data);
  }

  getBookingData(): Observable<BookingState | null> {
    return this.bookingDataSubject.asObservable();
  }

  createBooking(request: CreateBookingRequestDto): Observable<any> {

    const idempotencyKey = uuid();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Idempotency-Key': idempotencyKey,
    });

    return this.http.post(`${this.baseUrl}/user/create`, request, { headers }).pipe(
      retry(2),
      catchError(error => {
        return throwError(() => new Error('Booking failed. Please try again.'));
      })
    );
  }
}
