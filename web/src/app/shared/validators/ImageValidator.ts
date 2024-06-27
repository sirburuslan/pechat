/*
 * @class ImageValidator
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2024-06-26
 *
 * This file contains the ImageValidator class which I'm using to validate the uploaded images
 */

// System Utils
import { FormControl, ValidationErrors } from "@angular/forms";

// Logic
export class ImageValidator {

  // Supported extensions for images
  static allowedExtensions = ['jpg', 'jpeg', 'png'];

  /**
   * Validate the form controls
   *
   * @param control
   *
   * @returns ValidationErrors or null
   */
  static validate(control: FormControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    // Get the uploaded image details
    const image = control.value as File;

    // Extract the image's extension from the image
    const extension = image.name.split('.').pop()?.toLowerCase();

    // Check if the image has allowed extension
    if (!ImageValidator.allowedExtensions.includes(extension!)) {
      return { invalidFileType: true };
    }

    // The image should have maximum 1 mb
    if (image.size > 1024 * 1024 * 1) {
      return { fileSizeTooLarge: true };
    }

    return null;

  }

}
