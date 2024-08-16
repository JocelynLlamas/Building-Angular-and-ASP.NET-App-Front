import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntriesResponse, EntriesRequest, EntryResponse } from './interfaces/request.interface';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  baseUrl: string = 'https://localhost:44363/api/entries/';

  constructor(private http: HttpClient) { }

  getEntry(id:number):Observable<EntryResponse>{
    return this.http.get<EntryResponse>(this.baseUrl+'/'+id);
  }

  getAll(): Observable<EntriesResponse> {
    return this.http.get<EntriesResponse>(this.baseUrl);
  }

  createEntry(entry: EntriesRequest): Observable<EntryResponse> {
    return this.http.post<EntryResponse>(this.baseUrl, entry);
  }

  updateEntry(id:number, entry: EntriesRequest):Observable<EntryResponse> {
    return this.http.put<EntryResponse>(this.baseUrl + '/' + id, entry);
  }

  deleteEntry(id:number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
  
}
