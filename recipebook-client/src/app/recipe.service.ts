import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Recipe } from './recipe';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private getUrl = 'api/recipes';
  private postUrl = 'api/recipe';

  constructor(private http: HttpClient) { }

  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || 'Server Error');
  }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.getUrl).pipe(
      retry(3),
      catchError(this.errorHandler));
  }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.postUrl, recipe, httpOptions).pipe(
      retry(3),
      catchError(this.errorHandler));
  }

}
