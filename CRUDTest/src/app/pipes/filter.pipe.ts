import { Pipe, PipeTransform } from '@angular/core';

import { IItem } from '../models/item.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  // filter pipe
  // items == data we need to search in
  // searchText == the value we need to search about
  transform(items: IItem[], searchText: string): IItem[] {
    // if items don't exists
    if (!items) {
      return [];
    }
    // if searchText don't exists
    if (!searchText) {
      return items;
    }
    // uppercase the searchText
    searchText = searchText.toLocaleUpperCase();
    // filter in the items about the searchText after uppercase items's values
    return items.filter((it) => {
      return Object.values(it)
        .toString()
        .toLocaleUpperCase()
        .includes(searchText);
    });
  }
}
