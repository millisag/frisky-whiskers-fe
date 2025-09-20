import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatService } from '../../core/services/cat.service';
import { Cat } from '../../shared/models/cat';
import { CatListComponent } from '../../shared/cats/cat-list/cat-list.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CatListComponent, FormsModule],
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
  handleDelete(id: number) {
    this.catService.deleteCat(id).subscribe({
      next: () => {
        // update signal by filtering out deleted cat
        this.cats.update((prev) => prev.filter((c) => c.id !== id));
      },
      error: (err) => {
        console.error('Failed to delete cat', err);
      }
    });
  }

  editingCat: Cat | null = null;

handleEdit(cat: Cat) {
  this.editingCat = { ...cat }; // clone so we don’t edit directly
}

closeModal() {
  this.editingCat = null;
}

saveEdit() {
  if (!this.editingCat) return;

  this.catService.updateCat(this.editingCat.id, this.editingCat).subscribe({
    next: (updated) => {
      this.cats.update((prev) =>
        prev.map((c) => (c.id === updated.id ? updated : c))
      );
      this.closeModal();
    },
    error: (err) => console.error('Failed to update cat', err),
  });
}
}


