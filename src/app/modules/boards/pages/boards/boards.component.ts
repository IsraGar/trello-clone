import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../../layout/components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBox, faWaveSquare, faClock, faAngleDown, faAngleUp, faHeart, faBorderAll, faUsers, faGear } from '@fortawesome/free-solid-svg-icons';
import { faTrello } from '@fortawesome/free-brands-svg-icons';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MeService } from '../../../../services/me.service';
import { Board } from '../../../../models/board.model';

@Component({
  selector: 'app-boards',
  standalone: true,
  imports: [NavbarComponent, FontAwesomeModule, CdkAccordionModule, CommonModule, RouterLink],
  templateUrl: './boards.component.html'
})
export class BoardsComponent implements OnInit{

  faTrello = faTrello;
  faBox = faBox;
  faWaveSquare = faWaveSquare;
  faClock = faClock;
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  faHeart = faHeart;
  faBorderAll = faBorderAll;
  faUsers = faUsers;
  faGear = faGear;

  private meService = inject(MeService);
  boards: Board[] = [];

  ngOnInit(): void {
    this.getMeBoards();
  }

  items = [
    {
      label: 'Item 1',
      items: [
        {
          label: 'Sub item 1.1'
        },
        {
          label: 'Sub item 1.2'
        }
      ]
    },
    {
      label: 'Item 2',
      items: [
        {
          label: 'Sub item 2.1'
        }
      ]
    },
    {
      label: 'Item 3',
      items: [
        {
          label: 'Sub item 3.1'
        },
        {
          label: 'Sub item 3.2'
        },
        {
          label: 'Sub item 3.3'
        }
      ]
    }
  ]

  getMeBoards(){
    this.meService.getMeBoards()
    .subscribe(boards => {
      this.boards = boards;
    })
  }

}
