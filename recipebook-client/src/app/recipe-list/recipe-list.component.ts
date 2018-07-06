import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RecipeService } from '.././recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  public recipes = [];
  public searchRecipes = [];
  public errorMsg;
  public selectedId;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.getRecipes()
      .subscribe(data => this.searchRecipes = this.recipes = data,
        error => this.errorMsg = error);
  }

  search(query: string) {
    this.searchRecipes = (query) ? this.recipes.filter(recipe => recipe.name.toLowerCase().includes(query.toLowerCase())) : this.recipes;
  }

}
