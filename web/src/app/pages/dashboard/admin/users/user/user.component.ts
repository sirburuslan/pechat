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

// Configuration
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    IconComponent,
    FieldTextComponent
  ],
  templateUrl: './user.component.html'
})

// Logic
export class UserComponent {

  // Lets create the form
  userDataForm!: FormGroup;

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
    });

  }

  get firstNameControl() {
    return this.userDataForm.get('firstName') as FormControl;
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

}
