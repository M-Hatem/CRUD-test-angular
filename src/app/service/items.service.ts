import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IItem } from '../models/item.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  constructor(private _Http: HttpClient) {}

  // To get all items
  getItems(first: number = 0, page: number = 0, rows: number = 10) {
    return this._Http.get(
      `http://40.127.194.127:777/api/Emergency/GetAllArrivingMethods?first=${first}&page=${page}&rows=${rows}`,
      httpOptions
    );
  }

  // To add a new item
  addItem(item: IItem) {
    return this._Http.post(
      'http://40.127.194.127:777/api/Emergency/AddOrUpdateArrivingMethod',
      JSON.stringify(item),
      httpOptions
    );
  }

  // To edit an item
  editItem(item: IItem) {
    return this._Http.post(
      'http://40.127.194.127:777/api/Emergency/AddOrUpdateArrivingMethod',
      JSON.stringify(item),
      httpOptions
    );
  }

  // To delete an item
  deleteItem(id: number) {
    const formData = JSON.stringify(id);

    return this._Http.post(
      'http://40.127.194.127:777/api/Emergency/DeleteArrivingMethod',
      formData,
      httpOptions
    );
  }
}
