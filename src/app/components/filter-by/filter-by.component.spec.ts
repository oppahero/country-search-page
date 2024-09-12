import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FilterByComponent } from './filter-by.component'
import { FormsModule } from '@angular/forms'
import mock from '../../../../db.json'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

describe('FilterByComponent', () => {
  let component: FilterByComponent
  let fixture: ComponentFixture<FilterByComponent>

  const expectedCountries = mock.data
  const expectedRegion = 'Asia'

  let selectDe: DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule]
    }).compileComponents()

    fixture = TestBed.createComponent(FilterByComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    fixture.componentRef.setInput('countries', expectedCountries)
    selectDe = fixture.debugElement.query(By.css('.filter'))

    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('set countries: should recover the different regions available to filter', () => {
    expect(component.regions.length).toBeGreaterThanOrEqual(8)
    console.log(component.regions.length)
  })

  // it('should raise selected event when clicked (triggerEventHandler)', () => {
  // TODO: falta desarrollar test
  //   let selectedRegion: string | undefined

  //   component.selectedEvent.subscribe((region: string) => (selectedRegion = region))

  //   selectDe.triggerEventHandler('click')

  //   expect(selectedRegion).toBe(selectedRegion)
  // })

  // it('should raise selected event when clicked (triggerEventHandler)', () => {
  //   component.selected = expectedRegion

  //   fixture.detectChanges()

  //   let selectedRegion: string | undefined

  //   component.selectedEvent.subscribe((region: string) => (selectedRegion = region))

  //   selectDe.triggerEventHandler('click')

  //   // expect(selectedRegion).toBe(expectedRegion)
  // })
})
