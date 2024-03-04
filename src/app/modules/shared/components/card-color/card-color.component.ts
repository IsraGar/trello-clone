import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { COLORS, Colors } from '../../../../models/colors.model';

@Component({
  selector: 'app-card-color',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-color.component.html'
})
export class CardColorComponent implements OnInit {

  @Input() color: Colors = 'sky';

  mapColors = COLORS;

  ngOnInit(): void {
    
  }

  get colors(){
    const classes = this.mapColors[this.color];
    return classes ? classes : {};
  }

}
