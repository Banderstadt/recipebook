import { Component, OnInit } from '@angular/core';
import { RecipeService } from '.././recipe.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  public recipes = [];
  public errorMsg;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  onSubmit(value) {
    this.recipeService.addRecipe(value)
      .subscribe(data => this.recipes.push(data),
        error => this.errorMsg = error);
  }

}
