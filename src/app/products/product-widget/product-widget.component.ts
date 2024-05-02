import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-product-widget',
  templateUrl: './product-widget.component.html',
  styleUrls: ['./product-widget.component.scss']
})
export class ProductWidgetComponent implements OnInit{
  @Input()
  public product:any={};
 ngOnInit() {

 }
}
