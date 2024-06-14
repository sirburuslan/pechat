// System Utils
import {
  Component,
  ViewEncapsulation
} from '@angular/core';
import { Title } from '@angular/platform-browser';

// Installed Utils
import { TranslateModule, TranslateService } from '@ngx-translate/core';

// App Utils
import { IconComponent } from '../../../shared/general/icon/icon.component';

// Configuration
@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    TranslateModule,
    IconComponent
  ],
  templateUrl: './not-found.component.html',
  styleUrl: '../../../../assets/styles/errors/_main.scss',
  encapsulation: ViewEncapsulation.None,
})

// Logic
export class NotFoundComponent {
  constructor(
    private readonly title: Title,
    private readonly translateService: TranslateService
  ) {
    this.translateService.get('page_not_found').subscribe((pageTitle: string) => {
      this.title.setTitle(pageTitle)
    });
  }
}
