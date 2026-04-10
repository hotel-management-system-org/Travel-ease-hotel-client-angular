import {Component, inject,OnInit} from '@angular/core';
import {HeroComponentSide2} from '../../../../pages/home-page/components/hero-side-2/hero.component';
import {ApartmentTableComponent} from '../../../../shared/components/apartment-table/apartment-table.component';
import {ActivatedRoute} from '@angular/router';
import {Hotel} from '../../../../services/hotel/hotel';
import {Subject, takeUntil} from 'rxjs';
import {ResponseHotelDto} from '../../../../dto/hotel.response';
import {NgForOf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {SearchData} from '../../../../dto/booking.dto';

@Component({
  selector: 'app-hotel-info',
  templateUrl: './hotel-info.component.html',
  imports: [
    HeroComponentSide2,
    ApartmentTableComponent,
    NgForOf,
    MatIcon,
  ],
  styleUrls: ['./hotel-info.component.scss']
})
export class HotelInfoComponent implements OnInit{


  route = inject(ActivatedRoute);
  hotelService = inject(Hotel);
  private destroy$ = new Subject<void>();
  hotel: ResponseHotelDto | undefined;
  id:any = null;
  searchData: SearchData| null = null;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    console.log("Id",this.id);
    console.log("ChickIn " , this.searchData?.checkIn)
    this.getHotelDetails()
  }


  getHotelDetails(): void {
    this.hotelService.findById(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: data => {
          console.log("Hotel fac " , data.hotelFacilities);
          this.hotel = data;

        },
        error: err => {
          console.log(err);
        }
      })
  }

}
