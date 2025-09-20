import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cat } from '../../models/cat';

@Component({
  standalone: true,
  selector: 'app-cat-list',
  imports: [],
  templateUrl: './cat-list.component.html',
  styleUrl: './cat-list.component.scss'
})
export class CatListComponent {
  @Input() cats: any[] = [];
  @Output() editCat = new EventEmitter<Cat>();
  @Output() deleteCat = new EventEmitter<number>();

  onEdit(cat: Cat) {
    this.editCat.emit(cat);
  }

  onDelete(id: number) {
    this.deleteCat.emit(id);
  }
}
