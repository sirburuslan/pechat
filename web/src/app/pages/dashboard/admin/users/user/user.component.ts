// System Utils
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

// Installed Utils
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription, take } from 'rxjs';

// App Utils
import type ApiResponse from '../../../../../shared/models/api-response.model';
import type { User } from '../../../../../shared/models/user.model';
import { UsersService } from '../../../../../services/users.service';
import { IconComponent } from '../../../../../shared/general/icon/icon.component';
import { FieldTextComponent } from '../../../../../shared/ui/fields/general/field-text/field-text.component';
import { FieldEmailComponent } from '../../../../../shared/ui/fields/general/field-email/field-email.component';
import { FieldPasswordComponent } from '../../../../../shared/ui/fields/general/field-password/field-password.component';
import { FieldSelectComponent } from '../../../../../shared/ui/fields/general/field-select/field-select.component';
import { NotificationsDirective } from '../../../../../shared/directives/notifications.directive';

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
    FieldSelectComponent,
  ],
  templateUrl: './user.component.html',
})

// Logic
export class UserComponent implements OnInit, OnDestroy {
  // Create the form for user data
  userDataForm!: FormGroup;

  // Create the form for user password
  userPasswordForm!: FormGroup;

  // Selected role
  selectedRole!: string;

  // Subscription for role input
  private roleSubscription!: Subscription;

  constructor(
    private title: Title,
    private translateService: TranslateService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UsersService,
    private notificationsDirective: NotificationsDirective
  ) {
    // Set page title
    this.translateService.get('user').subscribe((pageTitle: string) => {
      this.title.setTitle(pageTitle);
    });

    // Create the form representation
    this.userDataForm = this.fb.group({
      firstName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50)
        ])
      ],
      lastName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50)
        ])
      ],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phone: ['', Validators.maxLength(50)],
      role: [
        '', Validators.required
      ]
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

  ngOnInit(): void {

    // Get the user's id
    const id = this.activatedRoute.snapshot.params['id'];

    // Get the user's info
    const userInfo = this.userService.getUserById(id);

    // Process the user info
    userInfo.pipe(take(1)).subscribe({
      next: (data: ApiResponse<User>) => {
        // Check for success response
        if (data.success) {
          // Set User Data
          this.userDataForm.get('firstName')?.setValue(data.content?.first_name);
          this.userDataForm.get('lastName')?.setValue(data.content?.last_name);
          this.userDataForm.get('email')?.setValue(data.content?.email);
          this.userDataForm.get('phone')?.setValue(data.content?.phone);
          this.userDataForm.get('role')?.setValue(data.content?.role);
          this.selectedRole = data.content?.role?this.translateService.instant('user'):this.translateService.instant('administrator');
        }
      },
      error: (err) => {
        console.error(err);
      }
    });

    // Monitor changes for role input
    this.roleSubscription = this.userDataForm.get('role')!.valueChanges.subscribe(value => {
      this.selectedRole = value?this.translateService.instant('user'):this.translateService.instant('administrator');
    });

  }

  ngOnDestroy(): void {
    if ( this.roleSubscription ) {
      this.roleSubscription.unsubscribe();
    }
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

    // Get the inputs data
    const firstName = this.userDataForm.get('firstName');
    const lastName = this.userDataForm.get('lastName');
    const phone = this.userDataForm.get('phone');
    const role = this.userDataForm.get('role');

    // Verify if the received user data is valid
    if (this.userDataForm.valid) {
      console.log('is good');
      // Subscribe to the newUserObservable
      /*newUserObservable.pipe(take(1)).subscribe({
        next: (data: ApiResponse<null>) => {
          if (data.success) {
            this.notificationsDirective.showNotification(
              'success',
              data.message,
            );
            this.userDataForm.reset();
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
      if (firstName && firstName.errors) {
        // Set error message
        this.notificationsDirective.showNotification('error', this.translateService.instant(
          'first_name_incorrect_length',
        ));
      } else if (lastName && lastName.errors) {
        // Set error message
        this.notificationsDirective.showNotification('error', this.translateService.instant(
          'last_name_incorrect_length',
        ));
      } else if (phone && phone.errors) {
        // Set error message
        this.notificationsDirective.showNotification('error', this.translateService.instant(
          'phone_number_too_long',
        ));
      } else if (role && role.errors) {
        // Set error message
        this.notificationsDirective.showNotification('error', this.translateService.instant(
          'role_incorrect_value',
        ));
      }
    }
  }

  onSubmitUserPassword(event: Event) {
    event.preventDefault();


  }

  translateText(text: string): string {
    return this.translateService.instant(text);
  }
}
