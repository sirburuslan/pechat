// System Utils
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Installed Utils
import { TranslateTestingModule } from 'ngx-translate-testing';

// App Utils
import en from '../../../assets/i18n/en.json';
import { HomeComponent } from './home.component';
import { TopBarComponent } from './parts/top-bar/top-bar.component';

// Test the HomeComponent
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeAll(async () => {
    const translations = en as never;
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HomeComponent,
        TopBarComponent,
        TranslateTestingModule.withTranslations({
          en: translations,
        }),
        RouterModule.forRoot([]),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('should create the component session', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the child components', () => {
    expect(fixture.nativeElement.querySelector('app-top-bar')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-presentation')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-stats')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-features')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-plans')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-faq')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-footer')).toBeTruthy();
  });

});
