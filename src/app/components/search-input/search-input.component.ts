import { Component, EventEmitter, Output } from '@angular/core'
import { heroMagnifyingGlass } from '@ng-icons/heroicons/outline'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [NgIconComponent, FormsModule],
  templateUrl: './search-input.component.html',
  providers: [provideIcons({ heroMagnifyingGlass })]
})
export class SearchInputComponent {
  searchBy: string = ''
  timeOutId!: any

  @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>()

  writting = (): void => {
    clearTimeout(this.timeOutId)
    this.timeOutId = setTimeout(() => {
      this.searchEvent.emit(this.searchBy)
    }, 1000)
  }
}
