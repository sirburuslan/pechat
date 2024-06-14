// System Utils
import { ComponentFixture, TestBed } from '@angular/core/testing';

// App Utils
import { AppComponent } from './app.component';

// Test the AppComponent
describe('AppComponent', () => {
  let component!: AppComponent;
  let fixture!: ComponentFixture<AppComponent>;

  beforeAll(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should contain <router-outlet></router-outlet>', () => {
    expect(fixture.nativeElement.querySelector('router-outlet')).toBeTruthy();
  });

  it('should contain <app-page-loading></app-page-loading>', () => {
    expect(fixture.nativeElement.querySelector('app-page-loading')).toBeTruthy();
  });

  it('should contain pc-main class', () => {
    expect(fixture.nativeElement.querySelector('.pc-main')).toBeTruthy();
  });

});
