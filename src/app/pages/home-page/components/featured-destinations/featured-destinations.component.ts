import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ResponseHotelDto} from '../../../../dto/hotel.response';
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from 'rxjs';
import {RouterLink} from '@angular/router';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {Hotel} from '../../../../services/hotel/hotel';

@Component({
  selector: 'app-featured-destinations',
  templateUrl: './featured-destinations.component.html',
  imports: [
    RouterLink,
    NgIf,
    NgForOf,
    CurrencyPipe
  ],
  styleUrls: ['./featured-destinations.component.scss']
})
export class FeaturedDestinationsComponent implements OnInit,OnDestroy {

  hotels: ResponseHotelDto[] = [];
  totalCount = 0;
  totalPages = 0;
  currentPage = 1;
  pageSize = 4;
  searchText = '';
  favorites = new Set<string>();

  isLoading = false;
  error: string | null = null;

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private hotelService: Hotel) {}

  ngOnInit(): void {
    this.loadHotels();
    this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.currentPage = 1;
      this.loadHotels();
    });
  }

  loadHotels(): void {
    this.isLoading = true;
    this.hotelService.findAll({
      searchText: this.searchText,
      page: this.currentPage,
      size: this.pageSize
    }).pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.hotels = data.dataList;
          this.totalCount = data.dataCount;
          this.totalPages = Math.ceil(data.dataCount / this.pageSize);
          this.isLoading = false;
        },
        error: () => {
          this.error = 'Hotels load කිරීමට නොහැකි විය!';
          this.isLoading = false;
        }
      });
  }

  onSearch(value: string): void {
    this.searchText = value;
    this.searchSubject.next(value);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadHotels();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  getPageRange(): number[] {
    const range = 2;
    const start = Math.max(1, this.currentPage - range);
    const end = Math.min(this.totalPages, this.currentPage + range);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  toggleFavorite(hotelId: string): void {
    this.favorites.has(hotelId)
      ? this.favorites.delete(hotelId)
      : this.favorites.add(hotelId);
  }

  isFavorite(hotelId: string): boolean {
    return this.favorites.has(hotelId);
  }

  // Image helpers
  getImageUrl(mainImage: string): string {
    if (!mainImage) return 'assets/images/hotel-placeholder.jpg';
    if (mainImage.startsWith('data:image') || mainImage.startsWith('http')) return mainImage;
    return `http://localhost:8080/uploads/hotels/${mainImage}`;
  }

  getStars(count: number): number[] {
    return Array(5).fill(0).map((_, i) => i < count ? 1 : 0);
  }

  trackById(_: number, hotel: ResponseHotelDto): string {
    return hotel.hotelId;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
