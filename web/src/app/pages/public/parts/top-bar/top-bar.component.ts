// System Utils
import {
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { RouterModule } from '@angular/router';

// Installed Utils
import { TranslateModule } from '@ngx-translate/core';

// App Utils
import { environment } from '../../../../../environment';

// Configuration
@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  templateUrl: './top-bar.component.html',
})

// Logic
export class TopBarComponent {
  // Site name and url
  siteName = environment.siteName;
  siteUrl = environment.siteUrl;

  // Send messages to the parent when the id is changed
  @Output() idChanged: EventEmitter<string> = new EventEmitter<string>();

  // The function which updates the id on click
  sendIdToParent(event: Event, id: string | undefined) {
    event.preventDefault();

    // Lets check if id exists
    if (typeof id !== 'undefined') {
      // Change id
      this.idChanged.emit(id);
    }
  }
}
