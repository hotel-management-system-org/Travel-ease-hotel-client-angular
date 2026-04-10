import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Hotel} from '../../../services/hotel/hotel';
import {first, Subject, take, takeUntil} from 'rxjs';
import {ResponseHotelDto, ResponseRoomDto} from '../../../dto/hotel.response';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {Policy} from '../../../services/hotel/policies/policy';
import {FormsModule} from '@angular/forms';
import {BookingService} from '../../../services/booking/booking';

@Component({
  selector: 'app-apartment-table',
  templateUrl: './apartment-table.component.html',
  imports: [
    RouterLink,
    CommonModule,
    CurrencyPipe,
    FormsModule
  ],
  styleUrls: ['./apartment-table.component.scss']
})
export class ApartmentTableComponent implements OnInit, OnDestroy {


  rooms: ResponseRoomDto[] = [];
  currentRoom: ResponseRoomDto | undefined;
  currentIndex:number = 0;
  private destroy$ = new Subject<void>();
  route = inject(ActivatedRoute);
  hotelService = inject(Hotel);
  bookingService = inject(BookingService);
  policyService = inject(Policy);
  hotel: ResponseHotelDto | undefined;
  policies: any | undefined;   // FIX: never undefined
  id: any = null;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");

    this.getHotelDetails();
  }

  onReserveClick() {

    this.bookingService.getBookingData().pipe(take(1)).subscribe(currentData => {
      const updatedData = {
        ...currentData!
      };

      this.bookingService.setBookingData(updatedData);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getHotelDetails(): void {
    this.hotelService.findById(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: data => {

          this.hotel = data;
          this.rooms = data.rooms;
          this.currentRoom = this.rooms[0];
          this.getPoliciesDetails(this.currentRoom.roomId);
        },
        error: err => {
          console.log(err);
        }
      })
  }

  getPoliciesDetails(currentRoomId: string): void {
    this.policyService.findById(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: policies => {

          this.policies = policies;

          if (!this.currentRoom!.policies) {
            this.currentRoom!.policies = [];
          }

          this.currentRoom!.policies.length = 0;

          this.policies.forEach((p: { id: any; policy: any; description: any; roomId: any; }) => {

            if(p.roomId === currentRoomId) {
              this.currentRoom!.policies!.push({
                id: p.id,
                policy: p.policy,
                description: p.description,
                roomId: p.roomId
              });
            }

          });

        },

        error: err => {
          console.log(err);
        }
      })
  }

  nextRoom() {
    if (this.currentIndex < this.rooms.length - 1) {
      this.currentIndex++;
      this.currentRoom = this.rooms[this.currentIndex];
      this.getPoliciesDetails(this.currentRoom.roomId);
    }
  }

  previousRoom() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.currentRoom = this.rooms[this.currentIndex];
    }
  }

  protected readonly first = first;
}
