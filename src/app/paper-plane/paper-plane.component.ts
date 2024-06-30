import {Component, Input, SimpleChanges} from '@angular/core';
import {trigger, state, style, transition, animate, keyframes} from '@angular/animations';

@Component({
  selector: 'app-paper-plane',
  templateUrl: './paper-plane.component.html',
  styleUrls: ['./paper-plane.component.scss'],
  animations: [trigger('planeAnimation', [
    transition('* => end', [
      animate('2s ease-in', keyframes([
        style({ transform: 'translate(0, 0)', offset: 0 }),
        style({ transform: 'translate(100vw, 100vh)', offset: 1 })
      ]))
    ])
  ])
  ]
})
export class PaperPlaneComponent {
  @Input() isAnimating: boolean = false;
  animationState: string = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isAnimating'] && this.isAnimating) {
      this.startAnimation();
    }
  }

  startAnimation() {
    this.animationState = 'end';
  }
}
