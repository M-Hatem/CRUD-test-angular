import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IItem } from 'src/app/models/item.model';
import { ItemsService } from 'src/app/service/items.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss'],
})
export class ItemFormComponent implements OnInit {
  itemForm!: FormGroup;

  id: number;
  item!: IItem;

  constructor(
    private _ItemsService: ItemsService,
    private _FormBuilder: FormBuilder,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {
    this.id = +this._ActivatedRoute.snapshot.params.id;
    this.getAllItems();

    this.itemForm = this._FormBuilder.group({
      arrivingArabicName: ['', [Validators.required]],
      arrivingEnglishName: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  getAllItems() {
    this._ItemsService.getItems().subscribe((data: any) => {
      const { data: items } = data;

      const item = items.filter((obj: IItem) => obj.id === this.id);
      this.item = item[0];

      if (this.id) {
        this.itemForm = this._FormBuilder.group({
          arrivingArabicName: [
            this.item?.arrivingArabicName,
            [Validators.required],
          ],
          arrivingEnglishName: [
            this.item?.arrivingEnglishName,
            [Validators.required],
          ],
        });
      }
    });
  }

  onSubmit(formData: FormGroup) {
    this._ItemsService.addItem(formData.value).subscribe((data: any) => {
      const { statusCode } = data;

      if (statusCode === 200) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Item Added Successfully!',
          showConfirmButton: false,
          timer: 1500,
        });

        this._Router.navigate(['']);
      }
    });
  }

  onEdit(formData: FormGroup) {
    const value = {
      id: this.id,
      ...formData.value,
    };

    this._ItemsService.editItem(value).subscribe((data: any) => {
      const { statusCode } = data;

      if (statusCode === 200) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Item Edited Successfully!',
          showConfirmButton: false,
          timer: 1500,
        });

        this._Router.navigate(['']);
      }
    });
  }
}
