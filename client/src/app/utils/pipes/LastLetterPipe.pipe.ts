import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'LastLetterPipe'
})
export class LastLetterPipePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    const lowercaseValue = value.toLowerCase();
    return lowercaseValue.substring(0, lowercaseValue.length - 1)
  }


}
