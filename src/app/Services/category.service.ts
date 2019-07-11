import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../ViewModels/category';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(private http: HttpClient) { }
  GetAllCategories(): Observable<Array<Category>> {

    const apiURl = `${environment.API_URL}api/Categories`;
    return this.http.get<Array<Category>>(apiURl);
  }

  GetCategoryById(ProdID: string): Observable<Category> {
    const apiURl = `${environment.API_URL}api/Categories/${ProdID}`;
    return this.http.get<Category>(apiURl);
  }

  addCategory(newCat: Category) {

    const apiURl = `${environment.API_URL}api/Categories`;
    return this.http.post(apiURl, newCat );
  }

  editCategory(catID: string , Cat: Category) {

    const apiURl = `${environment.API_URL}api/Categories/${catID}`;
    return this.http.put(apiURl, Cat);
  }
  deleteCategory(catID: string) {
    const apiURl = `${environment.API_URL}api/Categories/${catID}`;
    return this.http.delete(apiURl);
  }
}
