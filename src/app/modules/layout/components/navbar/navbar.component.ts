import { Component, OnInit, inject } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faInfoCircle, faAngleDown, faAngleUp, faClose } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';
import { TokenService } from '../../../../services/token.service';
import { MeService } from '../../../../services/me.service';
import { Board } from '../../../../models/board.model';
import {CdkMenuModule} from '@angular/cdk/menu';
import {CdkMenu, CdkMenuItem} from '@angular/cdk/menu';
import { BoardFormComponent } from '../board-form/board-form.component';
import { BoardsService } from '../../../../services/boards.service';
import { Colors, NAVBAR_BACKGROUNDS } from '../../../../models/colors.model';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonComponent, OverlayModule, FontAwesomeModule, RouterLink, CommonModule, CdkMenuModule, CdkMenu, CdkMenuItem, BoardFormComponent],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit{

  private authService = inject(AuthService);
  private tokenService = inject(TokenService);
  private router = inject(Router);
  private meService = inject(MeService);
  private boardService = inject(BoardsService);
  boards: Board[] = [];
  user$ =  this.authService.user$;
  navbarBackgroundColor: Colors = 'sky';
  navbarColors = NAVBAR_BACKGROUNDS;

  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faAngleDown =faAngleDown;
  faAngleUp = faAngleUp;
  faClose = faClose;

  isOpen = false;
  isBoardsOpen = false;
  isOpenOverlayCreateBoard = false;

  constructor(){
    this.boardService.backgroundColor$.subscribe(color => {
      this.navbarBackgroundColor = color;
    })
  }

  ngOnInit(): void {
    this.getBoards();
  }

  getBoards(){
    this.meService.getMeBoards().subscribe(boards => {
      this.boards = boards;
    })
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }

  isValidToken(){
    console.log(this.tokenService.isValidToken());
  }

  close(event: boolean){
    this.getBoards();
    this.isOpenOverlayCreateBoard = event;
  }

  get colors(){
    const classes = this.navbarColors[this.navbarBackgroundColor];
    return classes ? classes : {};
  }

}
