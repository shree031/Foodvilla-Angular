import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-product-widget',
  templateUrl: './product-widget.component.html',
  styleUrls: ['./product-widget.component.scss']
})
export class ProductWidgetComponent implements OnInit {
  @Input()
  public product: any = {};

  @Input()
  public isCart: boolean = false;

  @Output()
  public remove: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {

  }

  removeItem() {
    this.remove.emit();
  }
}
