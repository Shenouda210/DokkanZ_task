import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../ViewModels/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  GetAllProducts(): Observable<Array<Product>> {

    const apiURl = `${environment.API_URL}api/Products`;
    return this.http.get<Array<Product>>(apiURl);
  }

  GetProductById(ProdID: number): Observable<Product> {
    const apiURl = `${environment.API_URL}api/Products/${ProdID}`;
    return this.http.get<Product>(apiURl);
  }

  addProduct(NewProduct: Product) {

    const apiURl = `${environment.API_URL}api/Products`;
    return this.http.post(apiURl, NewProduct );
  }

  editProduct(ProdID: number , prod: Product) {

    const apiURl = `${environment.API_URL}api/Products/${ProdID}`;
    return this.http.put(apiURl, prod);
  }
  deleteProduct(ProdID: number) {
    const apiURl = `${environment.API_URL}api/Products/${ProdID}`;
    return this.http.delete(apiURl);
  }
}
