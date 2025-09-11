import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CatService } from '../../../core/services/cat.service';
import { Cat } from '../../../shared/models/cat';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-cats-new',
  imports: [ReactiveFormsModule],
  templateUrl: './cats-new.component.html',
  styleUrls: ['./cats-new.component.scss']
})
export class CatsNewComponent {
  catForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    breed: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required, Validators.min(0)]),
    weight: new FormControl('', [Validators.required, Validators.min(0)]),
  });

  constructor(private catService: CatService, private router: Router) {}

  onSubmit() {
    if (this.catForm.valid) {
      const catData: Cat = {
        name: this.catForm.value.name || '',
        breed: this.catForm.value.breed || '',
        color: this.catForm.value.color || '',
        age: Number(this.catForm.value.age) || 0,
        weight: Number(this.catForm.value.weight) || 0,
        id: 0,
        ownerId: 0
      };

      this.catService.createCat(catData, 0).subscribe({
        next: (cat: Cat) => {
          console.log('Cat created', cat);
          this.router.navigate(['/cats']);
        },
        error: (error: any) => {
          console.error('Error creating cat', error);
        },
      });
    }
  }
}