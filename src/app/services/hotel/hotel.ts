import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {
  HotelPaginateResponseDto,
  HotelQueryParams,
  ResponseHotelDto, ResponseRoomDto,
  StandardResponseDto
} from '../../dto/hotel.response';

@Injectable({
  providedIn: 'root',
})
export class Hotel {
  private baseUrl = environment.baseUrl+'/hotel-service/api';

  http = inject(HttpClient)


  public findAll(params:HotelQueryParams): Observable<HotelPaginateResponseDto>{
    const httpParams = new HttpParams()
      .set('searchText', params.searchText)
      .set('page', (params.page-1).toString())
      .set('size', params.size.toString())

    return this.http.get<StandardResponseDto<HotelPaginateResponseDto>>(
      this.baseUrl+'/hotels/visitors/find-all',
      {params:httpParams}
    ).pipe(
      map((res)=>res.data)
    )
  }

  public findById(id: string): Observable<ResponseHotelDto>{
    console.log("Hotel id " ,  id)
    return this.http.get<StandardResponseDto<ResponseHotelDto>>(
      this.baseUrl+'/hotels/visitors/find-by-id/'+id
    ).pipe(
      map((res)=>res.data)
    )
  }

  public findRoomBYId(id: string): Observable<ResponseRoomDto>{
    return this.http.get<StandardResponseDto<ResponseRoomDto>>(
      this.baseUrl+'/rooms/visitor/find-by-id/'+id
    ).pipe(
      map((res)=>res.data)
    )
  }
}
