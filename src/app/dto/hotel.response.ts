

export interface ResponseHotelDto{
  hotelId:string;
  activeStatus?:boolean;
  createdAt?:string;
  updatedAt?:string;
  description?:string;
  hotelName:string;
  mainImage:string;
  starRating:number;
  startingFrom:string;
  branches:ResponseBranch[];
  rooms:ResponseRoomDto[];
  policies:ResponsePoliciesDto[];
  hotelFacilities:ResponseHotelFacilityDto[];
}

export interface ResponseBranch{
  branchId:string;
  branchName:string;
  branchType:string;
  roomCount:number;
  hotelId:string;
  address:ResponseAddress;
}

export interface ResponseAddress{
  addressId:string;
  addressLine:string;
  city:string;
  country:string;
  longitude:string;
  latitude:string;
}

export interface HotelPaginateResponseDto {
  dataList: ResponseHotelDto[];
  dataCount: number;
}

export interface ResponseFacilityDto{
   id:number;
   name:string;
   roomId:string;
}

export interface ResponseRoomImageDto{
  id:number;
  directory:string;
  fileName:string;
  hash:string;
  resourceUrl:string;
  roomId:string;
}

export interface ResponseRoomDto{
  roomId:string;
  bedCount:number;
  isAvailable:boolean;
  price:number;
  roomNumber:number;
  roomType:string;
  branchId:string;
  facilities:ResponseFacilityDto[];
  images:ResponseRoomImageDto[];
  policies:ResponsePoliciesDto[];
}

export interface ResponsePoliciesDto{
  id:number;
  policy:string;
  description:string;
  roomId:string;
}


export interface StandardResponseDto<T> {
  code: number;
  message: string;
  data: T;
}

export interface ResponseHotelFacilityDto{
   id:number;
   name:string;
   icon:string;
   hotelId:string;
}

export interface HotelQueryParams {
  searchText: string;
  page: number;
  size: number;
}
