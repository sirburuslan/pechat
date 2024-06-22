// System Utils
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

// Installed Utils
import {
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';

// App Utils
import { IconComponent } from '../../../../../shared/general/icon/icon.component';

// Configuration
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    TranslateModule,
    IconComponent
  ],
  templateUrl: './user.component.html'
})

// Logic
export class UserComponent {
  constructor(
    private readonly title: Title,
    private readonly translateService: TranslateService
  ) {
    // Set page title
    this.translateService.get('user').subscribe((pageTitle: string) => {
      this.title.setTitle(pageTitle);
    })
  }
}
