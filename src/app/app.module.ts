import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { CategoryComponent } from './Components/category/category.component';
import { ProductComponent } from './Components/product/product.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalComponent } from './Components/product/modal/modal.component';
import { EditProductComponent } from './Components/product/edit-product/edit-product.component';
import { AddCategoryComponent } from './Components/category/add-category/add-category.component';
// import { FilterByCategoryNameComponent } from './Components/product/filter-by-category-name/filter-by-category-name.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CategoryComponent,
    ProductComponent,
    ModalComponent,
    EditProductComponent,
    AddCategoryComponent,
    // FilterByCategoryNameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgxSmartModalModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
