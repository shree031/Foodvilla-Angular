import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-recipe-widget',
  templateUrl: './recipe-widget.component.html',
  styleUrls: ['./recipe-widget.component.scss']
})
export class RecipeWidgetComponent {
  @Input()
  public recipe: any;

}
