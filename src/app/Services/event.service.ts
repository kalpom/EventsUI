import { Injectable } from '@angular/core';
import { IEvent } from '../Models/event.interface';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EventService {
  
  httpOptions = {
    _headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    get headers() {
      return this._headers;
    },
    set headers(value) {
      this._headers = value;
    },
    response: 'json',
};

   private eventApiURL = environment.apiUrl ;

   getEventsListURL = environment.apiUrl + 'events/getevents/';
   getEventByIdURL = environment.apiUrl+ 'events/geteventbyid/';

   constructor(private httpClient: HttpClient) { }

  getAllEventsFromAPI(): Observable<any> {
    return this.httpClient.get(this.getEventsListURL, this.httpOptions);
  }
 
  getEventByIdFromAPI(id: number): Observable<any> {
    return this.httpClient.get(this.getEventByIdURL + JSON.stringify(id), this.httpOptions);
  }

}
