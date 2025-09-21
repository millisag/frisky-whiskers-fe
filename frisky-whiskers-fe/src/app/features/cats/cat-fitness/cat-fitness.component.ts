import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FoodEntryService, FoodEntry } from '../../../core/services/food-entry.service';
import { ActivityEntryService, ActivityEntry } from '../../../core/services/activity-entry.service';
import { FormsModule } from '@angular/forms';
import { Input } from '@angular/core';

@Component({
  selector: 'app-cat-fitness',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cat-fitness.component.html',
  styleUrls: ['./cat-fitness.component.scss']
})
export class CatFitnessComponent implements OnInit {
  catId!: number;
  // @Input() catName = '';

  foodEntries = signal<FoodEntry[]>([]);
  activityEntries = signal<ActivityEntry[]>([]);

  newFood: Partial<FoodEntry> = { name: '', calories: 0 };
  newActivity: Partial<ActivityEntry> = { activity_type: '', duration: '' };

  constructor(
    private route: ActivatedRoute,
    private foodService: FoodEntryService,
    private activityService: ActivityEntryService
  ) {}

  ngOnInit() {
    this.catId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadEntries();
  }

  loadEntries() {
    this.foodService.getFoods(this.catId).subscribe((data: FoodEntry[]) => this.foodEntries.set(data));
    this.activityService.getActivities(this.catId).subscribe((data: ActivityEntry[]) => this.activityEntries.set(data));
  }

  addFoodEntry() {
    this.foodService.addFood(this.catId, this.newFood).subscribe(() => {
      this.newFood = { name: '', calories: 0 };
      this.loadEntries();
    });
  }

  addActivityEntry() {
    this.activityService.addActivity(this.catId, this.newActivity).subscribe(() => {
      this.newActivity = { activity_type: '', duration: '' };
      this.loadEntries();
    });
  }

  deleteFood(id: number) {
    this.foodService.deleteFood(this.catId, id).subscribe(() => this.loadEntries());
  }

  deleteActivity(id: number) {
    this.activityService.deleteActivity(this.catId, id).subscribe(() => this.loadEntries());
  }
}

