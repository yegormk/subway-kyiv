import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SubwayStation } from '../interfaces/subway-station';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StationsService {
  private http = inject(HttpClient);
  
  public loadSubwayStations(): Observable<SubwayStation[]>  {
    return this.http.get<SubwayStation[]>('http://localhost:3000/stations')
  }
}
