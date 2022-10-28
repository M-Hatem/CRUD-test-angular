import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { ItemsComponent } from './components/home/items/items.component';
import { HttpClientModule } from '@angular/common/http';
import { SingleItemComponent } from './components/home/items/single-item/single-item.component';
import { ItemFormComponent } from './components/item-form/item-form.component';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { EditItemComponent } from './components/edit-item/edit-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AddItemComponent,
    ItemsComponent,
    SingleItemComponent,
    ItemFormComponent,
    EditItemComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule,
    NoopAnimationsModule,
    HttpClientModule,
    MdbFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
