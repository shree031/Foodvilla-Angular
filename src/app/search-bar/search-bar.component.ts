import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Input()
  public items: any[] = [];

  searchTerm: string = '';
  isInputEmpty: boolean = true;
  private filteredItems = this.items;
  @Output() filteredItemsChange = new EventEmitter<any[]>();

  filterProducts() {
    if (!this.searchTerm.trim()) {
      this.filteredItems = [...this.items];
    } else {
      this.filteredItems = this.items.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.filteredItemsChange.emit(this.filteredItems); // Emit the updated filteredItems
  }


  onInputChange(): void {
    this.isInputEmpty = this.searchTerm.trim() === '';
    this.filterProducts();
  }

  clearSearchField(): void {
    this.searchTerm = '';
    this.isInputEmpty = true;
    this.filterProducts();
  }
}
