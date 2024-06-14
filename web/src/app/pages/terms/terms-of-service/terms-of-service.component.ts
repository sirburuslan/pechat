// System Utils
import { Component, ElementRef } from '@angular/core';

// Installed Utils
import { MarkdownModule } from 'ngx-markdown';

// App Utils
import { TermsLayoutComponent } from '../terms-layout.component';
import { TranslateService } from '@ngx-translate/core';

// Configuration
@Component({
  selector: 'app-terms-of-service',
  standalone: true,
  imports: [
    MarkdownModule,
    TermsLayoutComponent
  ],
  templateUrl: './terms-of-service.component.html'
})

// Logic
export class TermsOfServiceComponent {

  headings: Element[] | undefined;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    public translate: TranslateService
  ) { }

  onLoad(): void {
    this.stripContent();
  }

  private stripContent(): void {
    this.elementRef.nativeElement
      .querySelector('markdown')!
      .querySelectorAll('markdown > p:nth-child(-n + 2), #ngx-markdown, #table-of-contents + ul, #table-of-contents')
      .forEach(x => x.remove());
  }

}
