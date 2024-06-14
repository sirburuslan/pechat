// System Utils
import { Injectable } from '@angular/core';

// Configuration
@Injectable({
  providedIn: 'root'
})

// Logic
export class UtilsService {

  formatDate = ( dateStr: string ): string => {
    return dateStr.split("T")[0];
  }

}
