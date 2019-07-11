import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Product } from 'src/app/ViewModels/product';
import { ProductService } from 'src/app/Services/product.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { Category } from 'src/app/ViewModels/category';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
category: Category;
   modalRef: BsModalRef;

  constructor(private CategoriesService: CategoryService,
              private modalService: BsModalService, private router: Router) {
                this.category = new Category();
  }

  ngOnInit() {

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.modalRef.hide();
  }
  addNewCategory(): void {

    this.CategoriesService.addCategory(this.category)
    .subscribe( data => { console.log(data),
      this.router.navigate(['/Category']);
                          this.modalRef.hide(); },
      err => { console.log(err); });
  }
}
