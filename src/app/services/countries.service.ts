import { Injectable } from '@angular/core'
import { Country } from '../interfaces'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
// import * as data from './db.json'

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private readonly url = 'http://localhost:3000/data'

  constructor (private readonly http: HttpClient) {}

  // Con Fetch Api
  async getCountries (): Promise<Country[]> {
    const data = await fetch(this.url)
    return (await data.json()) ?? []
  }

  getAllCountries (): Observable<Country[]> {
    return this.http.get<Country[]>(this.url)
  }

  // return this.http.get<Country[]>(this.url).pipe(
  //   tap((countries) => {
  //     return countries.find(country => country.name.localeCompare(countryName))
  //   })
  // )
}
