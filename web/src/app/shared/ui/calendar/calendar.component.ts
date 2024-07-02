// System Utils
import { Component, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

// Installed Utils
import { TranslateModule } from '@ngx-translate/core';

// App Utils
import { IconComponent } from '../../general/icon/icon.component';
import { UtilsService } from '../../../services/utils.service';

// Type for calendar dates
type CalendarDate = {
  date?: string;
  text?: number;
  selected?: boolean;
  empty: boolean;
};

// Configuration
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, TranslateModule, IconComponent],
  templateUrl: './calendar.component.html',
})

// Logic
export class CalendarComponent {

  // Sent Data
  @Output() callbackValue = new EventEmitter<string>();

  // Dropdown Status
  dropdownStatus: string = 'false';

  // Events date parameters
  events = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  };

  // HTML Calendar container
  calendarDates: Array<CalendarDate[]> = [];

  // Selected date holder
  selectedDate = '';

  constructor(
    private elementRef: ElementRef,
    private utilsService: UtilsService,
  ) {
    this.getCalendar();
  }

  // Events Handlers

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (
      typeof event !== 'undefined' &&
      !this.elementRef.nativeElement.contains(event.target)
    ) {
      this.dropdownStatus = 'false';
    }
  }

  callback(event: Event, prop: string | undefined) {
    event.preventDefault();
    if ( typeof prop === 'string' ) {
      this.selectedDate = prop;
      this.callbackValue.emit(prop);
      setTimeout(() => this.getCalendar(), 100);
    }
  }

  // Other Methods

  toggleDropdown(event: MouseEvent): void {
    event.preventDefault();

    // Change the dropdown status
    this.dropdownStatus = this.dropdownStatus === 'false' ? 'true' : 'false';
  }

  getCalendar(): void {

    // Reset calendar dates
    this.calendarDates = [];

    // Set current date
    const current = new Date();

    // Get day
    const day = current.getDate();

    // Set day
    const d = new Date(this.events.year, this.events.month, 0);

    // Get time
    const e = new Date(d.getFullYear(), d.getMonth(), 1);

    // Current day
    let fday = e.getDay();

    // Show option
    let show: number = 1;

    // Increase day
    fday++;

    // Calendar rows
    let row: CalendarDate[] = [];

    // Calculate days
    for (let s = 2; s < 40; s++) {
      // Verify if show is greater than current date
      if (show > d.getDate()) {
        break;
      }

      // Verify if should be added new row
      if ((s - 2) % 7 === 0 && row.length > 0) {
        this.calendarDates.push(row);
        row = [];
      }

      // Verify if the date is in the current month
      if (fday <= s) {
        // Prepare the date
        const this_date = show;

        // Verify if is the current day
        if (
          this_date === day &&
          this.events.month === current.getMonth() + 1 &&
          this.events.year === current.getFullYear()
        ) {
          // Add date with current day class
          row.push({
            date: this.events.year + '-' + this.events.month + '-' + this_date,
            text: this_date,
            selected: false,
            empty: false,
          });
        } else {
          // Add a date
          row.push({
            date: this.events.year + '-' + this.events.month + '-' + this_date,
            text: this_date,
            selected:
              this.events.year + '-' + this.events.month + '-' + this_date ===
              this.selectedDate
                ? true
                : false,
            empty: false,
          });
        }

        // Increase the date to show
        show++;
      } else {
        row.push({
          empty: true,
        });
      }
    }

    // Check if row exists
    if (row.length > 0) {
      this.calendarDates.push(row);
    }
  }

  monthText(month: number): string {
    return this.utilsService.monthText(month);
  }

  previousMonth(): void {
    // If next month is hight than 11
    if (this.events.month < 2) {
      // Update Year
      this.events.year--;

      // Update month
      this.events.month = 12;
    } else {
      // Update month
      this.events.month--;
    }
    // Reload calendar
    this.getCalendar();
  }

  nextMonth(): void {
    // If next month is hight than 11
    if (this.events.month > 11) {
      // Update Year
      this.events.year++;

      // Update month
      this.events.month = 1;
    } else {
      // Update month
      this.events.month++;
    }
    // Reload calendar
    this.getCalendar();
  }
}
