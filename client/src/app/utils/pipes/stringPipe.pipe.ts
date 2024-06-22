import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringPipe',
})
export class StringPipe implements PipeTransform {
  transform(value: number): string {
    if (!value) {
      return '';
    }

    return value.toString();
  }
}
