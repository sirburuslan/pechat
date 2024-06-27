/*
 * @component User
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2024-06-26
 *
 * This file contains the User's component which displays the member's page in the administrator panel
 */


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
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

// Installed Utils
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription, take } from 'rxjs';

// App Utils
import type ApiResponse from '../../../../../shared/models/api-response.model';
import type { User } from '../../../../../shared/models/user.model';
import { UserService } from '../../../../../services/user.service';
import { UtilsService } from '../../../../../services/utils.service';
import { IconComponent } from '../../../../../shared/general/icon/icon.component';
import { FieldTextComponent } from '../../../../../shared/ui/fields/general/field-text/field-text.component';
import { FieldEmailComponent } from '../../../../../shared/ui/fields/general/field-email/field-email.component';
import { FieldPasswordComponent } from '../../../../../shared/ui/fields/general/field-password/field-password.component';
import { FieldSelectComponent } from '../../../../../shared/ui/fields/general/field-select/field-select.component';
import { NotificationsDirective } from '../../../../../shared/directives/notifications.directive';
import { ImageValidator } from '../../../../../shared/validators/ImageValidator';

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
  animations: [
    trigger('iconAnimation', [
      state('hidden', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      state(
        'rotating',
        style({
          opacity: 1,
          animation: '2s pc-rotate-icon-animation-next infinite linear',
        }),
      ),
      transition('hidden => visible', [animate('0.5s')]),
    ]),
  ],
})

// Logic
export class UserComponent implements OnInit, OnDestroy {
  // Image Url holder
  userImage: string | null = null;

  // Create the form for change image
  userImageForm!: FormGroup;

  // Create the form for user data
  userDataForm!: FormGroup;

  // Create the form for user password
  userPasswordForm!: FormGroup;

  // Selected role
  selectedRole!: string;

  // Updating data status
  update = {
    image: false,
    data: false,
    password: false
  };

  // Events date parameters
  events = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    date: new Date().getDate()
  };

  // Subscription for role input
  private roleSubscription!: Subscription;

  constructor(
    private title: Title,
    private translateService: TranslateService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private utilsService: UtilsService,
    private notificationsDirective: NotificationsDirective
  ) {
    // Set page title
    this.translateService.get('user').subscribe((pageTitle: string) => {
      this.title.setTitle(pageTitle);
    });

    // Create the form group for user image change
    this.userImageForm = this.fb.group({
      image: [
        '',
        [
          Validators.required,
          ImageValidator.validate
        ]
      ]
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
          //Check if the user has an image
          if ( data.content?.image ) {
            this.userImage = data.content?.image;
          }
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

  get firstNameControl(): FormControl {
    return this.userDataForm.get('firstName') as FormControl;
  }

  get lastNameControl(): FormControl {
    return this.userDataForm.get('lastName') as FormControl;
  }

  get emailControl(): FormControl {
    return this.userDataForm.get('email') as FormControl;
  }

  get phoneControl(): FormControl {
    return this.userDataForm.get('phone') as FormControl;
  }

  get roleControl(): FormControl {
    return this.userDataForm.get('role') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.userPasswordForm.get('password') as FormControl;
  }

  get repeatPasswordControl(): FormControl {
    return this.userPasswordForm.get('repeatPassword') as FormControl;
  }

  onFileChange(event: Event) {

    // Get the input target
    const target = event.target as HTMLInputElement;

    // Check if input contains files
    if (target.files && target.files.length > 0) {

      // Get the file
      const image = (event.target as HTMLInputElement).files?.[0];

      // Add image to the form
      this.userImageForm.patchValue({ image: image });

      // Validate and save image
      this.changeUserImage();
    }
  }

  changeUserImage() {

    // Get the inputs data
    const image = this.userImageForm.get('image');

    // Verify if the received image is valid
    if (this.userImageForm.valid) {

      // Enable animation
      this.update.image = true;

      // Create a form data for image
      const formData = new FormData();

      // Now lets add the image to the form data
      formData.append('image', image?.value);

      // Get the user's id
      const id = this.activatedRoute.snapshot.params['id'];

      // Send image as form data
      const userImageObservable = this.userService.updateUserImage(formData, id);

      // Subscribe to the user update observable
      userImageObservable.pipe(take(1)).subscribe({
        next: (data: ApiResponse<null>) => {
          if (data.success) {
            this.notificationsDirective.showNotification(
              'success',
              data.message,
            );
            // Get the user's info
            const userInfo = this.userService.getUserById(id);
            // Process the user info
            userInfo.pipe(take(1)).subscribe({
              next: (data: ApiResponse<User>) => {
                // Check for success response
                if (data.success) {
                  //Check if the user has an image
                  if ( data.content?.image ) {
                    this.userImage = data.content?.image;
                  }
                }
              },
              error: (err) => {
                console.error(err);
              }
            });
          } else {
            this.notificationsDirective.showNotification('error', data.message);
          }
        },
        error: (err: unknown) => {
          console.log(err);
        },
        complete: () => {
          this.update.image = false;
        }
      });

    } else {

      // Verify if the error is known
      if ( image?.errors ) {

        // Check if is invalid
        if ( image?.errors['invalidFileType'] ) {

          // Set error message
          this.notificationsDirective.showNotification('error', this.translateService.instant(
            'upload_image_unsupported_file_type'
          ));

        } else if ( image?.errors['fileSizeTooLarge'] ) {

          // Set error message
          this.notificationsDirective.showNotification('error', this.translateService.instant(
            'upload_image_too_big'
          ));

        }

      } else {

        // Set error message
        this.notificationsDirective.showNotification('error', this.translateService.instant(
          'an_error_has_occurred'
        ));

      }

    }

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

      // Enable animation
      this.update.data = true;

      // Get the user's id
      const id = this.activatedRoute.snapshot.params['id'];

      // Update a user
      const userUpdateObservable = this.userService.updateUser({
        first_name: firstName!.value,
        last_name: lastName!.value,
        phone: phone!.value,
        role: role!.value
      }, id);

      // Subscribe to the user update observable
      userUpdateObservable.pipe(take(1)).subscribe({
        next: (data: ApiResponse<null>) => {
          if (data.success) {
            this.notificationsDirective.showNotification(
              'success',
              data.message,
            );
          } else {
            this.notificationsDirective.showNotification('error', data.message);
          }
        },
        error: (err: unknown) => {
          console.log(err);
        },
        complete: () => {
          this.update.data = false;
        }
      });

    } else {

      // Check if errors exists for first name
      if (firstName && firstName.errors) {
        // Set error message
        this.notificationsDirective.showNotification('error', this.translateService.instant(
          'first_name_incorrect_length'
        ));
      } else if (lastName && lastName.errors) {
        // Set error message
        this.notificationsDirective.showNotification('error', this.translateService.instant(
          'last_name_incorrect_length'
        ));
      } else if (phone && phone.errors) {
        // Set error message
        this.notificationsDirective.showNotification('error', this.translateService.instant(
          'phone_number_too_long'
        ));
      } else if (role && role.errors) {
        // Set error message
        this.notificationsDirective.showNotification('error', this.translateService.instant(
          'phone_number_too_long'
        ));
      }
    }
  }

  onSubmitUserPassword(event: Event) {
    event.preventDefault();

    // Get the inputs data
    const password = this.userPasswordForm.get('password');
    const repeatPassword = this.userPasswordForm.get('repeatPassword');

    // Verify if the received user data is valid
    if ( this.userPasswordForm.valid ) {

      // Enable animation
      this.update.password = true;

      // Get the user's id
      const id = this.activatedRoute.snapshot.params['id'];

      // Verify if password match
      if ( password?.value != repeatPassword?.value ) {
        // Set error message
        this.notificationsDirective.showNotification('error', this.translateService.instant(
          'repeat_password_doesnt_match'
        ));
      } else {

        // Update a user's password
        const userUpdateObservable = this.userService.updateUserPassword({
          password: password?.value
        }, id);

        // Subscribe to the user update observable
        userUpdateObservable.pipe(take(1)).subscribe({
          next: (data: ApiResponse<null>) => {
            if (data.success) {
              this.notificationsDirective.showNotification(
                'success',
                data.message,
              );
            } else {
              this.notificationsDirective.showNotification('error', data.message);
            }
          },
          error: (err: unknown) => {
            console.log(err);
          },
          complete: () => {
            this.update.password = false;
          }

        });

      }

    } else {

      // Check if errors exists for password
      if (password && password.errors) {
        // Set error message
        this.notificationsDirective.showNotification('error', this.translateService.instant(
          'password_incorrect_length'
        ));
      } else if (repeatPassword && repeatPassword.errors) {
        // Set error message
        this.notificationsDirective.showNotification('error', this.translateService.instant(
          'repeat_password_doesnt_match'
        ));
      }

    }

  }

  translateText(text: string): string {
    return this.translateService.instant(text);
  }

  monthText(month: number): string {
    return this.utilsService.monthText(month);
  }

}
