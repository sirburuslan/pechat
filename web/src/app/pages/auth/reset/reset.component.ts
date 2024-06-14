// System Utils
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';

// Installed Utils
import { TranslateService, TranslateModule } from '@ngx-translate/core';

// App Utils
import { AuthLayoutComponent } from '../../../shared/layouts/auth/auth-layout.component';

// Configuration
@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [AuthLayoutComponent, RouterLink, TranslateModule],
  templateUrl: './reset.component.html',
})

// Logic
export class ResetComponent {
  constructor(
    private titleService: Title,
    private translate: TranslateService,
  ) {
    this.translate.get('reset_password').subscribe((pageTitle: string) => {
      this.titleService.setTitle(pageTitle);
    });
  }
}
