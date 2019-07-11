import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './Components/category/category.component';
import { ProductComponent } from './Components/product/product.component';
// import { FilterByCategoryNameComponent } from './Components/product/filter-by-category-name/filter-by-category-name.component';

const routes: Routes = [
  {
    path: 'Category', component: CategoryComponent,
},
{
  path: 'Product', component: ProductComponent,
  },
  { path: '',
  redirectTo: '/Category',
  pathMatch: 'full'
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
