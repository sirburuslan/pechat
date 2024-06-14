// System Utils
import {
  EventEmitter,
  Component,
  Input,
  Output,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';

// Installed Utils
import { TranslateModule } from '@ngx-translate/core';

// App Utils
import { IconComponent } from '../icon/icon.component';

// Configuration
@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, TranslateModule, IconComponent],
  templateUrl: './navigation.component.html',
})

// Logic
export class NavigationComponent implements OnChanges {
  // Received Data
  @Input() scope!: string;
  @Input() total!: number;
  @Input() page!: number;
  @Input() limit!: number;

  // Returned Data
  @Output() navigate = new EventEmitter<number>();

  pages: {
    page: number;
    active: boolean;
  }[] = [];

  ngOnChanges(changes: import('@angular/core').SimpleChanges) {

    // Monitor the changes for page
    if (changes['page']) {

      // Empty pages
      this.pages = [];

      // Count pages
      const totalPages: number = Math.ceil(this.total / this.limit) + 1;

      // Calculate start page
      const from: number = this.page > 2 ? this.page - 2 : 1;

      // List all pages
      for (let p: number = from; p < totalPages; p++) {
        // Verify if p is equal to current page
        if (p === this.page) {
          // Add current page
          this.pages.push({
            page: p,
            active: true,
          });
        } else if (p < this.page + 3 && p > this.page - 3) {
          // Add page number
          this.pages.push({
            page: p,
            active: false,
          });
        } else if (
          p < 6 &&
          totalPages > 5 &&
          (this.page === 1 || this.page === 2)
        ) {
          // Add page number
          this.pages.push({
            page: p,
            active: false,
          });
        } else {
          break;
        }
      }
    }

  }

  onPageClick(event: MouseEvent, page: number) {
    event.preventDefault();
    this.navigate.emit(page);
  }
}
