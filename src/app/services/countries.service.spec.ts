import { CountriesService } from './countries.service'
import { HttpClient } from '@angular/common/http'
import { asyncData } from '../testing/async-observable-helpers'

import mockedData from '../../../db.json'

describe('CountriesService', () => {
  let service: CountriesService
  let httpClientSpy: jasmine.SpyObj<HttpClient>

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get'])
    service = new CountriesService(httpClientSpy)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('url should be in localhost:3000', () => {
    expect(service.url).toEqual('http://localhost:3000/data')
  })

  it('getAllCountries: should return the expected list of Countries (successful)', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(asyncData(mockedData))

    service.getAllCountries().subscribe({
      next: (res: any) => {
        expect(res.data)
          .withContext('expected data')
          .toEqual(mockedData.data)
        done()
      },
      error: done.fail
    })
  })
})
