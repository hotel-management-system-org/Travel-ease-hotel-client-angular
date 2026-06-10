import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { CreateBookingRequestDto } from '../models/booking.dto';
import { BehaviorSubject, catchError, Observable,throwError } from 'rxjs';

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
    this.bookingDataSubject.next(data);
  }

  getBookingData(): Observable<BookingState | null> {
    return this.bookingDataSubject.asObservable();
  }

  createBooking(request: CreateBookingRequestDto,idempotencyKey: string): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Idempotency-Key': idempotencyKey,
    });

    return this.http.post(`${this.baseUrl}/user/create`, request, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
       return throwError(() => error)
      })
    );
  }
}
