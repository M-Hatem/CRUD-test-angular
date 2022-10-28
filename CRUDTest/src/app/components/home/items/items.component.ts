import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/service/items.service';

import { IItem } from 'src/app/models/item.model';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  items!: IItem[];

  constructor(private _ItemsService: ItemsService) {}

  ngOnInit(): void {
    this.getAllItems();
  }

  getAllItems() {
    this._ItemsService.getItems().subscribe((data: any) => {
      const { data: allItems } = data;
      this.items = allItems;
    });
  }
}
