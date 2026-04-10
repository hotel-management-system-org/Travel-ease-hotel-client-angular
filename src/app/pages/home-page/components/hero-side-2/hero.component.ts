import {Component, HostListener, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {BookingService} from '../../../../services/booking/booking';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  imports: [
    FormsModule,
    DatePipe,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./hero.component.scss'],

})
export class HeroComponentSide2 {

  bookingService = inject(BookingService)
  calendarOpen = false;
  activeField: 'checkin' | 'checkout' | null = null;
  checkInDate: Date | null = null;
  checkOutDate: Date | null = null;
  hoverDate: Date | null = null;
  roomCount = 1;

  // ---- Display months ----
  today = new Date();
  displayMonth1 = this.today.getMonth();
  displayYear1  = this.today.getFullYear();
  get displayMonth2() { return (this.displayMonth1 + 1) % 12; }
  get displayYear2()  { return this.displayMonth1 === 11 ? this.displayYear1 + 1 : this.displayYear1; }

  dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  monthNames = ['January','February','March','April','May','June',
    'July','August','September','October','November','December'];




  onSearchUpdate() {

    const options:Intl.DateTimeFormatOptions = {month: 'short',day: 'numeric', year: 'numeric'};

    const formattedCheckIn = this.checkInDate?.toLocaleDateString('en-US',options);
    const formattedCheckOut = this.checkOutDate?.toLocaleDateString('en-US',options);

    const searchData = {
      checkIn: formattedCheckIn!,
      checkOut: formattedCheckOut!,
      roomCount: this.roomCount,
    };

    console.log("Room count " , searchData.roomCount);
    this.bookingService.setBookingData(searchData);
  }

  openCalendar(field: 'checkin' | 'checkout') {
    this.activeField = field;
    this.calendarOpen = true;

    console.log("CheckInDate " , this.checkInDate)
    console.log("CheckOutDate " , this.checkOutDate);
  }

  closeCalendar() {
    this.calendarOpen = false;
    this.activeField = null;
  }

  @HostListener('document:click')
  onDocClick() { this.closeCalendar(); }

  prevMonth() {
    if (this.displayMonth1 === 0) { this.displayMonth1 = 11; this.displayYear1--; }
    else { this.displayMonth1--; }
  }

  nextMonth() {
    if (this.displayMonth1 === 11) { this.displayMonth1 = 0; this.displayYear1++; }
    else { this.displayMonth1++; }
  }

  getMonthLabel(year: number, month: number): string {
    return `${this.monthNames[month]} ${year}`;
  }

  getEmptyDays(year: number, month: number): number[] {
    return Array(new Date(year, month, 1).getDay()).fill(0);
  }

  getDays(year: number, month: number): number[] {
    return Array.from({ length: new Date(year, month + 1, 0).getDate() }, (_, i) => i + 1);
  }

  toDate(day: number, year: number, month: number): Date {
    return new Date(year, month, day);
  }

  isPast(day: number, year: number, month: number): boolean {
    const d = this.toDate(day, year, month); d.setHours(0,0,0,0);
    const t = new Date(); t.setHours(0,0,0,0);
    return d < t;
  }

  isStart(day: number, year: number, month: number): boolean {
    if (!this.checkInDate) return false;
    return this.toDate(day, year, month).getTime() === this.checkInDate.getTime();
  }

  isEnd(day: number, year: number, month: number): boolean {
    if (!this.checkOutDate) return false;
    return this.toDate(day, year, month).getTime() === this.checkOutDate.getTime();
  }

  isInRange(day: number, year: number, month: number): boolean {
    const d = this.toDate(day, year, month);
    const end = this.checkOutDate ?? this.hoverDate;
    if (!this.checkInDate || !end) return false;
    return d > this.checkInDate && d < end;
  }

  hoverDay(day: number, year: number, month: number) {
    if (this.checkInDate && !this.checkOutDate)
      this.hoverDate = this.toDate(day, year, month);
  }

  selectDay(day: number, year: number, month: number) {
    const picked = this.toDate(day, year, month);
    if (this.isPast(day, year, month)) return;

    if (!this.checkInDate || (this.checkInDate && this.checkOutDate)) {
      this.checkInDate  = picked;
      this.checkOutDate = null;
      this.activeField  = 'checkout';
    } else if (picked > this.checkInDate) {
      this.checkOutDate = picked;
      this.hoverDate    = null;
      this.onSearchUpdate();
      this.closeCalendar();
    } else {
      this.checkInDate  = picked;
      this.checkOutDate = null;
    }
  }

}
