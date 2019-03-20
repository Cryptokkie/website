import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyCoinName'
})
export class PrettyCoinNamePipe implements PipeTransform {

  transform(value: string): string {
    return this.titleCase(value.replace('-', ' '));
  }

  // Capitalize First Letter Of Each Word In A String
  titleCase(str: string): string {
    const splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  }
}
