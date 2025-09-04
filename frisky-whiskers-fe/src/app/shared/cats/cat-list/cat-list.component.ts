import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-cat-list',
  imports: [],
  templateUrl: './cat-list.component.html',
  styleUrl: './cat-list.component.scss'
})
export class CatListComponent {
  @Input() cats: any[] = [];
}
