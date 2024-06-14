// System Utils
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';

// Installed Utils
import { TranslateTestingModule } from 'ngx-translate-testing';

// App Utils
import en from '../../../../../assets/i18n/en.json';
import { TopBarComponent } from './top-bar.component';

// Test the TopBarComponent
describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;

  beforeAll(async () => {
    const translations = en as never;
    await TestBed.configureTestingModule({
      imports: [
        TopBarComponent,
        TranslateTestingModule.withTranslations({
          en: translations,
        }),
        RouterModule.forRoot([]),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('should create the component session', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct siteUrl', () => {
    const logoElement = fixture.debugElement.query(
      By.css('.pc-top-bar-logo a'),
    );
    expect(logoElement.nativeElement.getAttribute('href')).toEqual(
      component.siteUrl,
    );
  });

  it('should have correct menu items', () => {
    const menuItems = fixture.debugElement.queryAll(
      By.css('.pc-top-bar-menu a'),
    );
    expect(menuItems.length).toBe(3);
    expect(menuItems[0].nativeElement.getAttribute('href')).toBe('#');
    expect(menuItems[1].nativeElement.getAttribute('href')).toBe('#');
    expect(menuItems[2].nativeElement.getAttribute('href')).toBe('#');
  });

  it('should load correctly all elements', () => {
    expect(fixture.nativeElement.querySelector('.pc-top-bar')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.pc-top-bar-container')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.pc-top-bar-logo')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.pc-top-bar-menu')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.pc-top-bar-auth')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.pc-auth-sign-in')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.pc-auth-sign-up')).toBeTruthy();
  });
});
