// System Utils
import { Component, inject, DestroyRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

// Installed Utils
import { TranslateService, TranslateModule } from '@ngx-translate/core';

// App Utils
import { environment } from '../../../../environment';
import { AuthLayoutComponent } from '../../../shared/layouts/auth/auth-layout.component';
import { IconComponent } from '../../../shared/general/icon/icon.component';
import { UserService } from '../../../services/user.service';

// Configuration
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    AuthLayoutComponent,
    IconComponent,
    TranslateModule,
  ],
  templateUrl: './signup.component.html',
})

// Logic
export class SignupComponent {
  // Password input type
  passwordType = 'password';

  // Lets create the form
  userForm: FormGroup;

  // Error message field for email
  errorEmailMessage = '';

  // Error message field for password
  errorPasswordMessage = '';

  // Success user creation message
  successMessage = '';

  // Error user creation message
  errorMessage = '';

  // Reference for component destroy
  destroyRef = inject(DestroyRef);

  // Inject the dependecies
  constructor(
    private titleService: Title,
    private translate: TranslateService,
    private fb: FormBuilder,
    private readonly router: Router,
    private readonly userService: UserService,
  ) {
    // Set Page Title
    this.translate.get('sign_up').subscribe((pageTitle: string) => {
      this.titleService.setTitle(pageTitle);
    });

    // Create the form representation
    this.userForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    });
  }

  // Set site name
  siteName = environment.siteName;

  // Change the password input type
  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  // Handle on submit form
  onSubmit(event: Event) {
    event.preventDefault();

    // Reset messages
    this.errorEmailMessage = '';
    this.errorPasswordMessage = '';
    this.successMessage = '';
    this.errorMessage = '';

    // Verify if the form data is valid
    if (this.userForm.valid) {
      // Create a new user
      const observable = this.userService.register(
        this.userForm.value as { email: string; password: string },
      );

      // Subscribe to the new user creation response
      observable.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (data: { success: boolean; message: string }) => {
          if (data.success) {
            this.successMessage = data.message;
            setTimeout(() => {
              this.router.navigate(['/auth/signin']);
            }, 3000);
          } else {
            this.errorMessage = data.message;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      // Get the email
      const email = this.userForm.get('email');

      // Check if errors exists for email
      if (email && email.errors) {
        // Detect email format error
        this.errorEmailMessage =
          typeof email.errors['email'] !== 'undefined'
            ? this.translate.instant('auth_email_not_valid')
            : '';

        // Detect required error
        this.errorEmailMessage =
          typeof email.errors['required'] !== 'undefined'
            ? this.translate.instant('auth_email_short')
            : this.errorEmailMessage;
      }

      // Get the password
      const password = this.userForm.get('password');

      // Verify if errors exists for password
      if (password && password.errors) {
        // Detect short password
        this.errorPasswordMessage =
          typeof password.errors['minlength'] !== 'undefined'
            ? this.translate.instant('auth_password_short')
            : '';

        // Detect long password
        this.errorPasswordMessage =
          typeof password.errors['maxlength'] !== 'undefined'
            ? this.translate.instant('auth_password_long')
            : '';

        // Detect required error
        this.errorPasswordMessage =
          typeof password.errors['required'] !== 'undefined'
            ? this.translate.instant('auth_password_short')
            : this.errorPasswordMessage;
      }
    }
  }
}
