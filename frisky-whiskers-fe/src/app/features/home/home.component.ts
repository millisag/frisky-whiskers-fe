import { Component, OnInit } from '@angular/core';
import { CatService } from '../../core/services/cat.service';
import { CatListComponent } from '../../shared/cats/cat-list/cat-list.component';
import { Cat } from '../../shared/models/cat';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CatListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cats: Cat[] = [];

  constructor(private catService: CatService) {}

  ngOnInit(): void {
    this.catService.getCats().subscribe({
      next: (cats) => {
        this.cats = cats;
        console.log(cats);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
