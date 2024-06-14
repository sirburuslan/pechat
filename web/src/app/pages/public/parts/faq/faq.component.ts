// System Utils
import { Component } from '@angular/core';

// Installed Utils
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from '../../../../shared/general/icon/icon.component';

// Configuration
@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [
    TranslateModule,
    IconComponent
  ],
  templateUrl: './faq.component.html',
})

// Logic
export class FaqComponent {
  showHideAnswer(e: Event, button: HTMLAnchorElement) {
    e.preventDefault();

    // Expand or collapse the answer on click
    if (button.getAttribute('aria-expanded') === 'false') {
      button.setAttribute('aria-expanded', 'true');
    } else {
      button.setAttribute('aria-expanded', 'false');
    }
  }
}
