import { Component, OnInit, Input , TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Product } from 'src/app/ViewModels/product';
import { ProductService } from 'src/app/Services/product.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { Category } from 'src/app/ViewModels/category';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
 Categories: Category[];
  SelectedProduct: Product;
  @Input( ) SelectedProductIdInNested: number;
  modalRef: BsModalRef;
  NewProduct: Product;
  constructor(private CategoriesService: CategoryService, private ProductsService: ProductService, private modalService: BsModalService, private router: Router) {
  }

  ngOnInit() {
    this.ProductsService.GetProductById(this.SelectedProductIdInNested).subscribe(data => {this.SelectedProduct = data; },
      err => {console.log(err); });
    this.CategoriesService.GetAllCategories().subscribe(data => {this.Categories = data;});
  }
  editProduct() {
    this.ProductsService.editProduct(this.SelectedProductIdInNested, this.SelectedProduct).subscribe(data => {
      console.log(data),
      this.router.navigate(['/Products']); },
        error => { console.log(error);
    });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.ProductsService.editProduct( this.SelectedProductIdInNested, this.SelectedProduct).subscribe (data => {this.router.navigate(['/Product']);
                                                                                                               this.modalRef.hide();
      },
    err => {alert(''); }
    );
  }

  decline(): void {
    this.modalRef.hide();
  }

}
