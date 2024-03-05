import { Component, OnInit, inject } from '@angular/core';
import { BtnComponent } from '../../../../components/btn/btn.component';
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

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [BtnComponent, OverlayModule, FontAwesomeModule, RouterLink, CommonModule, CdkMenuModule, CdkMenu, CdkMenuItem, BoardFormComponent],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit{

  private authService = inject(AuthService);
  private tokenService = inject(TokenService);
  private router = inject(Router);
  private meService = inject(MeService);
  boards: Board[] = [];
  user$ =  this.authService.user$;

  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faAngleDown =faAngleDown;
  faAngleUp = faAngleUp;
  faClose = faClose;

  isOpen = false;
  isBoardsOpen = false;
  isOpenOverlayCreateBoard = false;

  constructor(){    
  }

  ngOnInit(): void {
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

}
