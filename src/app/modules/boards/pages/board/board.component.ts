import { Component, OnInit, inject } from '@angular/core';
import {DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { ToDo, Column } from '../../../../models/todo.model';
import { NavbarComponent } from '../../../layout/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import {FormsModule} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TodoDialogComponent } from '../../components/todo-dialog/todo-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { BoardsService } from '../../../../services/boards.service';
import { Board } from '../../../../models/board.model';
import { Card } from '../../../../models/cards.model';
import { CardService } from '../../../../services/card.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [DragDropModule, NavbarComponent, CommonModule, CdkDropListGroup, CdkDropList, CdkDrag, FormsModule, DialogModule, FontAwesomeModule, TodoDialogComponent],
  templateUrl: './board.component.html',
  styles: [
    `
    /* Animate items as they're being sorted. */
    .cdk-drop-list-dragging .cdk-drag {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }

    /* Animate an item that has been dropped. */
    .cdk-drag-animating {
      transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
    }
    `
  ]
})
export class BoardComponent implements OnInit {

  faPlus = faPlus;
  private dialog = inject(Dialog);
  private route = inject(ActivatedRoute);
  private boardService = inject(BoardsService);
  private cardService = inject(CardService);
  board: Board | null = null;

  constructor(){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if(id){
        this.getBoard(id);
      }
    });
  }

  todoList: ToDo[] = [];
  doingList: ToDo[] = [];
  doneList: ToDo[] = [];

  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    const position = this.boardService.getPosition(event.container.data, event.currentIndex);
    const card = event.container.data[event.currentIndex];

    const listId = event.container.id;

    this.updateCard(card, position, listId);
  }

  addColumn(){
    // this.columns.push({
    //   title: 'New Column',
    //   todos: []
    // });
  }

  openDialog(card: Card){
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      minWidth: '300px',
      maxWidth: '50%',
      data: {
        card: card
      }
    });
    dialogRef.closed.subscribe(output => {
      console.log(output);  
    });
  }

  private getBoard(id: string){
    this.boardService.getBoard(id)
      .subscribe(board => {
        this.board = board;
      })
  }

  private updateCard(card: Card, position: number, listId: string | number){
    this.cardService.update(card.id, { position, listId })
    .subscribe(cardUpdated => {
      console.log(cardUpdated);      
    })
  }

}