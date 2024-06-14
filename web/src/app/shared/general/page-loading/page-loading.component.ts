// System Utils
import {
  Component,
  Inject,
  Renderer2,
  PLATFORM_ID,
  OnInit,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

// Configuration
@Component({
  selector: 'app-page-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-loading.component.html',
})

// Logic
export class PageLoadingComponent implements OnInit {
  // Hide loading marker
  hideLoading = false;

  // Loading text container
  loadingText = '0';

  // Class constructor
  constructor(
    private rendered: Renderer2,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  // Run code after init
  ngOnInit(): void {
    // Verify if is the browser
    if (isPlatformBrowser(this.platformId)) {
      // Add overflow hide to the body
      this.rendered.setStyle(document.body, 'overflow', 'hidden');

      // Default counter
      let c = 0;

      // Timer
      const timer = setInterval(() => {
        // Verify if the limit was reached
        if (c === 100) {
          // Wait for 700 milleseconds
          setTimeout((): void => {
            // Hide animation
            this.hideLoading = true;

            // Wait for 300 milleseconds
            setTimeout((): void => {
              // Stop
              clearInterval(timer);

              // Remove style from the body
              this.rendered.removeStyle(document.body, 'overflow');
            }, 300);
          }, 700);
        } else {
          // Increase counter
          c = c + 1;

          // Display the percentage
          this.loadingText = c + '%';
        }
      }, 10);
    }
  }
}
