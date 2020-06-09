import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { Observable, EMPTY } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = 'http://localhost:3001/products'
  constructor(private snackBar: MatSnackBar, private http: HttpClient) {
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map((obj) => obj),
      catchError(err => this.errorHandler(err))
    );
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError(err => this.errorHandler(err))
    );
  }

  readById(id: String): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Product>(url).pipe(
      map((obj) => obj),
      catchError(err => this.errorHandler(err))
    );
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`
    return this.http.put<Product>(url, product).pipe(
      map((obj) => obj),
      catchError(err => this.errorHandler(err))
    );
  }

  delete(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`
    return this.http.delete<Product>(url).pipe(
      map((obj) => obj),
      catchError(err => this.errorHandler(err))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage(`Ocorreu algum erro msg: ${e.message}`, true);
    return EMPTY;
  }
}
