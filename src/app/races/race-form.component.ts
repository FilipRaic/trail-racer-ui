import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RaceService} from '../service/race.service';
import {Race, RaceDistance} from '../model/race';
import {Observable, of, Subscription} from 'rxjs';

@Component({
  selector: 'app-race-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './race-form.component.html'
})
export class RaceFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  id: string | null = null;
  distances = Object.keys(RaceDistance).filter(k => isNaN(Number(k)));
  loading = false;
  race$: Observable<Race | null> = of(null);
  private raceSub?: Subscription;
  private currentVersion: number | undefined;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly raceService: RaceService,
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      distance: [this.distances[0], Validators.required],
      startDateTimeUtc: ['', Validators.required]
    });

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.loading = true;
      this.race$ = this.raceService.getById(this.id);
      this.raceSub = this.race$.subscribe({
        next: (race) => {
          if (race) {
            this.currentVersion = race.version;
            this.form.patchValue({
              name: race.name,
              distance: race.distance,
              startDateTimeUtc: new Date(race.startDateTimeUtc).toISOString().slice(0, 16)
            });
          }
        },
        complete: () => this.loading = false
      });
    }
  }

  save(): void {
    if (this.form.invalid) return;
    const payload: Partial<Race> = {
      id: this.id,
      name: this.form.value.name,
      distance: this.form.value.distance,
      startDateTimeUtc: new Date(this.form.value.startDateTimeUtc).toISOString(),
      version: this.currentVersion
    } as any;

    const req$ = this.id
      ? this.raceService.update(payload)
      : this.raceService.create(payload);

    req$.subscribe(() => this.router.navigate(['/races']));
  }

  ngOnDestroy(): void {
    if (this.raceSub) {
      this.raceSub.unsubscribe();
    }
  }
}
