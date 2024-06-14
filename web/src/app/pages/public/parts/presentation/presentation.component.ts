// System Utils
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// Installed Utils
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from '../../../../shared/general/icon/icon.component';

// Configuration
@Component({
  selector: 'app-presentation',
  standalone: true,
  imports: [RouterLink, TranslateModule, IconComponent],
  templateUrl: './presentation.component.html',
})

// Logic
export class PresentationComponent {}
