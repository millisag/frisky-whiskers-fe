import { Component, OnInit } from '@angular/core';
import { CatService } from '../../core/services/cat.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  cats = [];

  constructor(private catService: CatService) {}

  ngOnInit(): void {
    this.catService.getCats().subscribe({
      next: (cats) => {
        console.log(cats);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
