import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class FscService {

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any>{
    return this.http.post(baseUrl, data);
  }
}
