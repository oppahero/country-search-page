import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { heroMagnifyingGlass, heroMoon } from '@ng-icons/heroicons/outline'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIconComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [provideIcons({ heroMoon, heroMagnifyingGlass })]
})
export class AppComponent {
}
