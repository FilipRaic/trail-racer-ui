import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {ApplicationService} from '../service/application.service';
import {RaceService} from '../service/race.service';
import {Race} from '../model/race';
import {Observable, of} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './application-form.component.html'
})
export class ApplicationFormComponent implements OnInit {
  form!: FormGroup;
  races$: Observable<Race[]> = of([]);
  loading = false;
  selectedRace?: Race;

  constructor(private readonly fb: FormBuilder,
              private readonly applicationService: ApplicationService,
              private readonly raceService: RaceService,
              private readonly router: Router,
              private readonly authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      raceId: ['', Validators.required],
      club: ['']
    });

    this.loading = true;
    this.races$ = this.raceService.getAll().pipe(
      finalize(() => this.loading = false)
    );
  }

  submit(): void {
    if (this.form.invalid) return;

    console.log('CURRENT USER', this.authService.currentUser!.id);
    const payload = {
      userId: this.authService.currentUser!.id,
      club: this.form.value.club,
      raceId: this.form.value.raceId
    }

    this.applicationService.create(payload).subscribe(() => {
      this.router.navigate(['/applications']);
    });
  }
}
