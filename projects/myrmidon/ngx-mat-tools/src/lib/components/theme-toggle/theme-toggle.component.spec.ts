import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeToggleComponent } from './theme-toggle.component';

describe('ThemeToggleComponent', () => {
  let fixture: ComponentFixture<ThemeToggleComponent>;

  beforeEach(async () => {
    localStorage.clear();
    document.documentElement.classList.remove('dark-mode');

    await TestBed.configureTestingModule({
      imports: [ThemeToggleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeToggleComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark-mode');
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show the dark_mode icon in light mode', () => {
    const icon: HTMLElement = fixture.nativeElement.querySelector('mat-icon');
    expect(icon.textContent?.trim()).toBe('dark_mode');
  });

  it('should toggle the theme service and update the icon on click', () => {
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');

    button.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.themeService.isDarkMode()).toBe(true);
    const icon: HTMLElement = fixture.nativeElement.querySelector('mat-icon');
    expect(icon.textContent?.trim()).toBe('light_mode');
  });
});
