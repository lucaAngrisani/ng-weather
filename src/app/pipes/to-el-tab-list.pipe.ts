import { Pipe, PipeTransform } from '@angular/core';
import { ConditionsAndZip } from '../models/conditions-and-zip.type';
import { TabListEl } from '../models/tab-list-el.type';

@Pipe({
  standalone: true,
  name: 'toElTabList'
})
export class ToElTabListPipe implements PipeTransform {

  transform(condition: ConditionsAndZip): TabListEl {
    return {
      id: condition?.zip,
      name: `${condition?.data?.name} (${condition?.zip})`,
      value: condition,
    }
  }

}
