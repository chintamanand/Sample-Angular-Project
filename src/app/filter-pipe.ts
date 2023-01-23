import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from './child-component/child-component.component';

@Pipe({
  name: 'filterPipe',
})
//sorting the elements based on search key, searching, transforming the data without altering..
export class FilterPipe implements PipeTransform {
  transform(items: Customer[], searchText: string): any[] {
    console.log('Transform() in filter class');
    if (items == null) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter((cust: Customer) => {
      return (
        cust.name.toLowerCase().includes(searchText) ||
        cust.gender.toLowerCase().includes(searchText) ||
        cust.location.toLowerCase().includes(searchText) ||
        cust.age.toLowerCase().includes(searchText) ||
        cust.income.toLowerCase().includes(searchText)
      );
    });
  }
}
