import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RecipesService } from "../recipes.service";
import { Recipe } from "../recipe.model";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.page.html",
  styleUrls: ["./recipe-detail.page.scss"]
})
export class RecipeDetailPage implements OnInit {
  loadedRecipe: Recipe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipesService: RecipesService,
    private router: Router,
    private alertCrtl: AlertController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramsMap => {
      if (!paramsMap.has("recipeId")) {
        return;
      } else {
        const recipeId = paramsMap.get("recipeId");
        this.loadedRecipe = this.recipesService.getRecipe(recipeId);
      }
    });
  }

  async onDeleteRecipe() {
    const alert = await this.alertCrtl.create({
      header: "Are you sure?",
      message: "Do you really wanna delete this recipe?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel"
        },
        {
          text: "Delete",
          handler: () => {
            this.recipesService.removeRecipe(this.loadedRecipe.id);
            this.router.navigate(["/recipes"]);
          }
        }
      ]
    });

    alert.present();
  }
}
