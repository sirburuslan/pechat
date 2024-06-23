// System Utils
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Title } from '@angular/platform-browser';

// Installed Utils
import {
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';

// App Utils
import { IconComponent } from '../../../../../shared/general/icon/icon.component';
import { FieldTextComponent } from '../../../../../shared/ui/fields/general/field-text/field-text.component';
import { FieldEmailComponent } from '../../../../../shared/ui/fields/general/field-email/field-email.component';
import { FieldPasswordComponent } from '../../../../../shared/ui/fields/general/field-password/field-password.component';
import { FieldSelectComponent } from '../../../../../shared/ui/fields/general/field-select/field-select.component';

// Configuration
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    IconComponent,
    FieldTextComponent,
    FieldEmailComponent,
    FieldPasswordComponent,
    FieldSelectComponent
  ],
  templateUrl: './user.component.html'
})

// Logic
export class UserComponent {

  // Create the form for user data
  userDataForm!: FormGroup;

  // Create the form for user password
  userPasswordForm!: FormGroup;

  constructor(
    private readonly title: Title,
    private readonly translateService: TranslateService,
    private readonly fb: FormBuilder,
  ) {
    // Set page title
    this.translateService.get('user').subscribe((pageTitle: string) => {
      this.title.setTitle(pageTitle);
    });

    // Create the form representation
    this.userDataForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phone: [''],
      role: ['', Validators.required]
    });

    // Create the form representation
    this.userPasswordForm = this.fb.group({
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ]),
      ],
      repeatPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ]),
      ],
    });

  }

  get firstNameControl() {
    return this.userDataForm.get('firstName') as FormControl;
  }

  get lastNameControl() {
    return this.userDataForm.get('lastName') as FormControl;
  }

  get emailControl() {
    return this.userDataForm.get('email') as FormControl;
  }

  get phoneControl() {
    return this.userDataForm.get('phone') as FormControl;
  }

  get roleControl() {
    return this.userDataForm.get('role') as FormControl;
  }

  get passwordControl() {
    return this.userDataForm.get('password') as FormControl;
  }

  get repeatPasswordControl() {
    return this.userDataForm.get('repeatPassword') as FormControl;
  }

  onSubmitUserData(event: Event) {
    event.preventDefault();

    // Enable the animation
    /*this.isSubmitting = true;

    // Reset error messages
    this.errors.firstName = '';
    this.errors.lastName = '';
    this.errors.email = '';
    this.errors.password = '';

    // Get the inputs data
    const firstName = this.newUserForm.get('firstName');
    const lastName = this.newUserForm.get('lastName');
    const email = this.newUserForm.get('email');
    const password = this.newUserForm.get('password');*/

    const role = this.userDataForm.get('role');
    console.log(role?.value);
    // Verify if the received user data is valid
    if (this.userDataForm.valid) {
      // Create a new user
      /*const newUserObservable = this.usersService.createUser({
        first_name: firstName?.value,
        last_name: lastName?.value,
        email: email?.value,
        password: password?.value,
      });

      // Subscribe to the newUserObservable
      newUserObservable.pipe(take(1)).subscribe({
        next: (data: ApiResponse<null>) => {
          if (data.success) {
            this.notificationsDirective.showNotification(
              'success',
              data.message,
            );
            this.newUserForm.reset();
            this.usersService.getUsers(this.users.page, this.searchControl.value);
          } else {
            this.notificationsDirective.showNotification('error', data.message);
          }
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });*/
    } else {
      // Check if errors exists for first name
      /*if (firstName && firstName.errors) {
        // Set error message
        this.errors.firstName = this.translateService.instant(
          'first_name_is_short',
        );
      }

      // Check if errors exists for last name
      if (lastName && lastName.errors) {
        // Set error message
        this.errors.lastName = this.translateService.instant(
          'first_name_is_short',
        );
      }

      // Check if errors exists for email
      if (email && email.errors) {
        // Detect email format error
        this.errors.email =
          typeof email.errors['email'] !== 'undefined'
            ? this.translateService.instant('auth_email_not_valid')
            : '';

        // Detect required error
        this.errors.email =
          typeof email.errors['required'] !== 'undefined'
            ? this.translateService.instant('auth_email_short')
            : this.errors.email;
      }

      // Verify if errors exists for password
      if (password && password.errors) {
        // Detect short password
        this.errors.password =
          typeof password.errors['minlength'] !== 'undefined'
            ? this.translateService.instant('auth_password_short')
            : '';

        // Detect long password
        this.errors.password =
          typeof password.errors['maxlength'] !== 'undefined'
            ? this.translateService.instant('auth_password_long')
            : '';

        // Detect required error
        this.errors.password =
          typeof password.errors['required'] !== 'undefined'
            ? this.translateService.instant('auth_password_short')
            : this.errors.password;
      }*/
    }
  }

  onSubmitUserPassword(event: Event) {
    event.preventDefault();

    // Enable the animation
    /*this.isSubmitting = true;

    // Reset error messages
    this.errors.firstName = '';
    this.errors.lastName = '';
    this.errors.email = '';
    this.errors.password = '';

    // Get the inputs data
    const firstName = this.newUserForm.get('firstName');
    const lastName = this.newUserForm.get('lastName');
    const email = this.newUserForm.get('email');
    const password = this.newUserForm.get('password');*/
    console.log(this.userDataForm.valid);
    // Verify if the received user data is valid
    if (this.userDataForm.valid) {
      // Create a new user
      /*const newUserObservable = this.usersService.createUser({
        first_name: firstName?.value,
        last_name: lastName?.value,
        email: email?.value,
        password: password?.value,
      });

      // Subscribe to the newUserObservable
      newUserObservable.pipe(take(1)).subscribe({
        next: (data: ApiResponse<null>) => {
          if (data.success) {
            this.notificationsDirective.showNotification(
              'success',
              data.message,
            );
            this.newUserForm.reset();
            this.usersService.getUsers(this.users.page, this.searchControl.value);
          } else {
            this.notificationsDirective.showNotification('error', data.message);
          }
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });*/
    } else {
      // Check if errors exists for first name
      /*if (firstName && firstName.errors) {
        // Set error message
        this.errors.firstName = this.translateService.instant(
          'first_name_is_short',
        );
      }

      // Check if errors exists for last name
      if (lastName && lastName.errors) {
        // Set error message
        this.errors.lastName = this.translateService.instant(
          'first_name_is_short',
        );
      }

      // Check if errors exists for email
      if (email && email.errors) {
        // Detect email format error
        this.errors.email =
          typeof email.errors['email'] !== 'undefined'
            ? this.translateService.instant('auth_email_not_valid')
            : '';

        // Detect required error
        this.errors.email =
          typeof email.errors['required'] !== 'undefined'
            ? this.translateService.instant('auth_email_short')
            : this.errors.email;
      }

      // Verify if errors exists for password
      if (password && password.errors) {
        // Detect short password
        this.errors.password =
          typeof password.errors['minlength'] !== 'undefined'
            ? this.translateService.instant('auth_password_short')
            : '';

        // Detect long password
        this.errors.password =
          typeof password.errors['maxlength'] !== 'undefined'
            ? this.translateService.instant('auth_password_long')
            : '';

        // Detect required error
        this.errors.password =
          typeof password.errors['required'] !== 'undefined'
            ? this.translateService.instant('auth_password_short')
            : this.errors.password;
      }*/
    }
  }

  translateText(text: string): string {
    return this.translateService.instant(text);
  }

}
