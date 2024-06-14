import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import en from '../../../../assets/i18n/en.json';
import { ResetComponent } from './reset.component';
import { RouterModule } from '@angular/router';

describe('ResetComponent', () => {
  let component: ResetComponent;
  let fixture: ComponentFixture<ResetComponent>;

  beforeEach(async () => {
    const translations = en as never;
    await TestBed.configureTestingModule({
      imports: [
        ResetComponent,
        TranslateTestingModule.withTranslations({
          en: translations,
        }),
        RouterModule.forRoot([]),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
