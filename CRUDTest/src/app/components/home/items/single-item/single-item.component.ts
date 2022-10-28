import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IItem } from 'src/app/models/item.model';
import { ItemsService } from 'src/app/service/items.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.scss'],
})
export class SingleItemComponent implements OnInit {
  @Input('item') item!: IItem;

  @Output() refresh = new EventEmitter();

  constructor(private _ItemsService: ItemsService, private _Router: Router) {}

  ngOnInit(): void {}

  editItem(id: number) {
    this._Router.navigate(['edit-item', id]);
  }

  refreshItems() {
    this.refresh.emit();
  }

  deleteItem(id: number) {
    this._ItemsService.deleteItem(id).subscribe((data: any) => {
      const { statusCode } = data;

      if (statusCode === 200) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Item Deleted Successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
        this.refreshItems();
      }
    });
  }
}
