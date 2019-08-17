import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, filterString, propName: string): any {
    const resultArray = [];

    if(value.length == 0) {
      return value;
    }

    for (const item of value) {

      if(item[propName] === filterString) {
        resultArray.push(item);
      }
    }
    return resultArray;

  }
}
