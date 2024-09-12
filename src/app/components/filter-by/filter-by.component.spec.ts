import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FilterByComponent } from './filter-by.component'
import { FormsModule } from '@angular/forms'
import mock from '../../../../db.json'

fdescribe('FilterByComponent', () => {
  let component: FilterByComponent
  let fixture: ComponentFixture<FilterByComponent>

  const mockedCountries = mock.data
  const expectedRegion = 'Asia'

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule]
    }).compileComponents()

    fixture = TestBed.createComponent(FilterByComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    fixture.componentRef.setInput('countries', mockedCountries)

    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('set countries: should recover the different regions available to filter', () => {
    expect(component.regions.length).toBeGreaterThanOrEqual(8)
  })

  it('#selectChange should raise selectedEvent when ngModelChange', () => {
    component.selected = expectedRegion

    spyOn(component.selectedEvent, 'emit')

    component.selectChange()

    expect(component.selectedEvent.emit).toHaveBeenCalled()
    expect(component.selectedEvent.emit).withContext('selected in the dropdown').toHaveBeenCalledWith(expectedRegion)
  })
})
