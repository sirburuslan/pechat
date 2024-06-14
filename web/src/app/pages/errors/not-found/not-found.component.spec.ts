// System Utils
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Installed Utils
import { TranslateModule, TranslateService } from '@ngx-translate/core';

// App Utils
import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        NotFoundComponent
      ],
      providers: [
        TranslateService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
