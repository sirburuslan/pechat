// Sytem Utils
import { Component } from '@angular/core';

// Installed Utils
import { TranslateModule } from '@ngx-translate/core';

// App Utils
import { IconComponent } from '../../../../shared/general/icon/icon.component';

// Configuration
@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [
    TranslateModule,
    IconComponent
  ],
  templateUrl: './stats.component.html',
})

// Logic
export class StatsComponent {}
