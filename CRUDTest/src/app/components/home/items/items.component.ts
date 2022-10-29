import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ItemsService } from 'src/app/service/items.service';
import { IItem } from 'src/app/models/item.model';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  items!: IItem[];
  totalCount!: number;

  searchText: string = '';

  pages!: any;

  isLoaded: boolean = true;

  constructor(private _ItemsService: ItemsService) {}

  ngOnInit(): void {
    this.getAllItems();
  }

  getAllItems() {
    this._ItemsService.getItems().subscribe((data: any) => {
      const { data: allItems, totalCount } = data;
      this.items = allItems;
      this.totalCount = +totalCount;
      if (allItems.length === 0) this.isLoaded = false;
    });
  }

  filterItems(item: string) {
    this._ItemsService.getItems().subscribe((data: any) => {
      const { data: allItems } = data;
      const items = allItems.filter((obj: IItem) =>
        Object.values(obj).toString().toLocaleUpperCase().includes(item)
      );

      this.items = items;
      this.totalCount = items.length;
      if (items.length === 0) this.isLoaded = false;
    });
  }

  paginate(event: any) {
    this.pages = { ...event };

    this._ItemsService
      .getItems(event.first, event.page, event.rows)
      .subscribe((data: any) => {
        const { data: allItems } = data;
        this.items = allItems;
      });
  }

  paginateAfterDelete() {
    const event = this.pages;

    this._ItemsService
      .getItems(event.first, event.page, event.rows)
      .subscribe((data: any) => {
        const { data: allItems } = data;
        this.items = allItems;
        if (allItems.length === 0) this.getAllItems();
      });
  }

  onSearch(formData: NgForm) {
    const value = formData.value.search.toLocaleUpperCase();
    this.filterItems(value);
  }

  resetFilter(searchForm: NgForm) {
    searchForm.reset();
    this.isLoaded = true;
    this.getAllItems();
  }
}
