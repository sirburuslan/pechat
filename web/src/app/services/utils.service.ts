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

  uniqueId = (): string => {
    const stringArr = [];
    for (let s = 0; s < 5; s++) {
      stringArr.push((((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1));
    }
    return stringArr.join('-');
  }

}
