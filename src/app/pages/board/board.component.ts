import { Component } from '@angular/core';
import {DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { ToDo, Column } from '../../models/todo.model';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import {FormsModule} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TodoDialogComponent } from '../../components/todo-dialog/todo-dialog.component';

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
export class BoardComponent {

  faPlus = faPlus;

  constructor(private dialog: Dialog){}

  columns: Column[] = [
    {
      title: 'To Do',
      todos: [
        {
          id: '1',
          title: 'Get to Work'
        },
        {
          id: '2',
          title: 'Pick up groceries'
        },
        {
          id: '3',
          title: 'Go Home'
        }
        ,
        {
          id: '4',
          title: 'Fall sleep'
        }
      ]
    },
    {
      title: 'Doing',
      todos: [
        {
          id: '1',
          title: 'Watch a movie'
        },
        {
          id: '2',
          title: 'Have lunch'
        },
        {
          id: '3',
          title: 'Take breakfast'
        },
        {
          id: '4',
          title: 'Check pending tasks'
        }
      ]
    },
    {
      title: 'Done',
      todos: [
        {
          id: '1',
          title: 'Get up'
        },
        {
          id: '2',
          title: 'Brush teeth'
        },
        {
          id: '3',
          title: 'Take a shower'
        },
        {
          id: '4',
          title: 'Check email'
        },
        {
          id: '5',
          title: 'Walk dog'
        }
      ]
    }
  ];

  todoList: ToDo[] = [];
  doingList: ToDo[] = [];
  doneList: ToDo[] = [];

  drop(event: CdkDragDrop<ToDo[]>) {
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
  }

  addColumn(){
    this.columns.push({
      title: 'New Column',
      todos: []
    });
  }

  openDialog(todo: ToDo){
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      minWidth: '300px',
      maxWidth: '50%',
      data: {
        todo: todo
      }
    });
    dialogRef.closed.subscribe(output => {
      console.log(output);      
    });
  }

}