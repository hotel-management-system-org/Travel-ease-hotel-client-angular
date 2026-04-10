import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Hotel} from '../../../../services/hotel/hotel';
import {Subject, takeUntil} from 'rxjs';
import {ResponseHotelDto} from '../../../../dto/hotel.response';

@Component({
  selector: 'app-hotel-image-gallery',
  templateUrl: './hotel-image-gallery.component.html',
  imports: [],
  styleUrls: ['./hotel-image-gallery.component.scss']
})
export class HotelImageGalleryComponent implements OnInit,OnDestroy {
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  route = inject(ActivatedRoute);
  hotelService = inject(Hotel);
  private destroy$ = new Subject<void>();
  hotel: ResponseHotelDto | undefined;
  id:any = null;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.getHotelDetails()
  }


  getHotelDetails(): void {
    this.hotelService.findById(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: data => {
          this.hotel = data;
        },
        error: err => {
          console.log(err);
        }
      })
  }

}
