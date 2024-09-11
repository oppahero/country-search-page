import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Country } from '../../interfaces'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-filter-by',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter-by.component.html'
})
export class FilterByComponent {
  selected: string = ''
  regions: string[] = []

  @Output() selectedEvent: EventEmitter<string> = new EventEmitter<string>()
  // eslint-disable-next-line accessor-pairs
  @Input() set countries (countries: Country[]) {
    if (countries?.length > 0) {
      this.regions = countries.reduce<string[]>((accumulator, item) => {
        if (!accumulator.includes(item.region)) {
          accumulator.push(item.region)
        }
        return accumulator
      }, [])
    }
  }

  selectChange (): void {
    this.selectedEvent.emit(this.selected)
  }
}
