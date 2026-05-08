import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);
  private apiUrl = 'https://restcountries.com/v3.1';

  getCountryByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/name/${name}`);
  }

  // Nuevo: búsqueda por código único (cca3) para el detalle
  getCountryByCode(cca3: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/alpha/${cca3}`);
  }
}