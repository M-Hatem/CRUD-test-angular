import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemsService } from 'src/app/service/items.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss'],
})
export class ItemFormComponent implements OnInit {
  itemForm: FormGroup;

  constructor(
    private _ItemsService: ItemsService,
    private _FormBuilder: FormBuilder,
    private _Router: Router
  ) {
    this.itemForm = this._FormBuilder.group({
      arrivingArabicName: ['', [Validators.required]],
      arrivingEnglishName: ['', [Validators.required]],
      id: ['', [Validators.required]],
      sort: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

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
}
