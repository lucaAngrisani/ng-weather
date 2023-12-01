import { Pipe, PipeTransform } from '@angular/core';
import { ConditionsAndZip } from '../models/conditions-and-zip.type';
import { TabListEl } from '../models/tab-list-el.type';

@Pipe({
  standalone: true,
  name: 'toTabList'
})
export class ToTabListPipe implements PipeTransform {

  transform(list: ConditionsAndZip[]): TabListEl[] {
    return list.map(condition => {
      return {
        id: condition?.zip,
        name: `${condition?.data?.name} (${condition?.zip})`,
        value: condition,
      }
    });
  }

}
