export interface CreateBookingRequestDto{
  roomId:string;
  quantity:number;
  totalPrice:number;
  firstName:string;
  lastName:string;
  zipCode:string;
  address:string;
  city:string;
  hotelId:string;
  guestEmail:string;
  guestPhone:string;
  checkIn:string;
  checkOut:string;
}

export interface SearchData {
  checkIn: Date | null;
  checkOut: Date | null;
}
