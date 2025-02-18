import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {
  @Input() rating: number = 0;
  @Output() ratingChange = new EventEmitter<number>();

  ngOnInit() {
  }

  onRatingClicked(rating: number): void {
    this.rating = rating;
    this.ratingChange.emit(this.rating);
  }
}
