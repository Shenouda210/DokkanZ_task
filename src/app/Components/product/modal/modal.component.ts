import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Product } from 'src/app/ViewModels/product';
import { ProductService } from 'src/app/Services/product.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { Category } from 'src/app/ViewModels/category';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  Categories: Category[];
   modalRef: BsModalRef;
  NewProduct: Product;

  constructor(private CategoriesService: CategoryService, private prodService: ProductService,
              private modalService: BsModalService, private router: Router) {
    this.NewProduct = new Product();
  }

  ngOnInit() {
    this.CategoriesService.GetAllCategories().subscribe(data => {this.Categories = data;});

  }

  AddNewProduct() {
    this.prodService.addProduct(this.NewProduct).subscribe (data => {console.log('done'); },
    err => {console.log(err); }
    );
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.modalRef.hide();
  }
  submit(f: NgForm) {
    //Chang This *************************
    this.prodService.addProduct(f.value).subscribe(
      data => {
        this.router.navigate(['/Product']);
      this.modalRef.hide();
      },
      err => console.error(err)
    );
    console.log(f.value);
  }
}