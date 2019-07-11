import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/app/ViewModels/product';
import { Router, NavigationEnd } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { Category } from 'src/app/ViewModels/category';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  p = 1;
  products: Product[];
  SelectedProduct: Product[];
  NewProduct: Product;
  modalRef: BsModalRef;
 // for reload page
  navigationSubscription;
  SelectedProductIdInContainer: number;
// for filter products
CategoriesList: Category[];
selected;
selectedData;
  constructor(private categoryService: CategoryService, private prodService: ProductService, private modalService: BsModalService, private router: Router) {
    // this.selectedData = this.someData; 
    this.NewProduct = new Product();
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalise the component
        if (e instanceof NavigationEnd) {
          this.initialiseInvites();
        }
      });
     }
     initialiseInvites() {
      // Set default values and re-fetch any data you need.
      this.prodService.GetAllProducts().subscribe(prods => { this.selectedData = prods; },
        error => {
          console.log(error);
        });
    }
    ngOnDestroy() {
      // avoid memory leaks here by cleaning up after ourselves. If we  
      // don't then we will continue to run our initialiseInvites()   
      // method on every navigationEnd event.
      if (this.navigationSubscription) {
         this.navigationSubscription.unsubscribe();
      }
    }
    // filter data
    onSelect(val) {
      console.log(val);
       this.prodService.GetAllProducts().subscribe(data => {this.selectedData = data.filter(x => x.categoryID == val)})

    }

  ngOnInit() {
    // display all categories
this.categoryService.GetAllCategories().subscribe(data => {this.CategoriesList = data})
  }
  RemoveSelectedProducts() {
    // filter selected Products
    this.SelectedProduct = this.products.filter(prod => prod.selected);

// tslint:disable-next-line: forin
    for (const product in this.SelectedProduct) {
      this.prodService.deleteProduct(this.SelectedProduct[product].ID)
      .subscribe (data =>  data = this.prodService.GetAllProducts()
      .subscribe(prods => { this.products = prods; this.modalRef.hide(); } ),
       error => {
        console.log(error);
      });
    }
  }

//  confirm delete
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {

    this.modalRef.hide();
  }

  decline(): void {

    this.modalRef.hide();
  }

  editProduct(ProdID: number) {
    this.router.navigate(['EditProduct/', ProdID ]);
      }
}
