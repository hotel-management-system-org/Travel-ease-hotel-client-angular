import {inject, Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {StandardResponseDto} from '../../models/hotel.response';
import {map, Observable} from 'rxjs';
import {ResponsePoliciesDto} from '../../models/policies.dto';

@Injectable({
  providedIn: 'root',
})
export class PolicyService {
  private baseUrl = environment.baseUrl+'/hotel-service/api/hotels/policy/visitors';
  http = inject(HttpClient)


  public findById(id:string): Observable<ResponsePoliciesDto>{
    return this.http.get<StandardResponseDto<ResponsePoliciesDto>>(
      this.baseUrl+'/find-by-id/'+id,
    ).pipe(
      map((res)=>res.data)
    )
  }
}
