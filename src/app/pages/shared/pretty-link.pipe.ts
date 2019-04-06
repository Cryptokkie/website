import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyLink'
})
export class PrettyLinkPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const reg = /https?:\/\/(.+)(?<!\/)/g;
    const match = reg.exec(value);
    return match ? match[1] : value;
  }

}
