import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatService } from '../../core/services/cat.service';
import { Cat } from '../../shared/models/cat';
import { CatListComponent } from '../../shared/cats/cat-list/cat-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CatListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // Signals for reactive state
  cats = signal<Cat[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  displayCats: Cat[] = [];

  constructor(private catService: CatService) {
    this.loadCats();
  }

  loadCats() {
    this.loading.set(true);
    this.error.set(null);

    this.catService.getCats().subscribe({
      next: (cats: Cat[]) => {
        this.cats.set(cats);
        this.displayCats = cats;
        this.loading.set(false);
      },
      error: (err: any) => {
        console.error('Failed to load cats', err);
        this.error.set('Failed to load cats');
        this.loading.set(false);
      }
    });
  }
}


