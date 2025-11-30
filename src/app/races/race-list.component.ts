import {Component, OnInit} from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import {RouterModule} from '@angular/router';
import {RaceService} from '../service/race.service';
import {Race} from '../model/race';
import {AuthService} from '../service/auth.service';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-race-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIf],
  templateUrl: './race-list.component.html'
})
export class RaceListComponent implements OnInit {
  races$: Observable<Race[]> = of([]);

  constructor(
    private readonly raceService: RaceService,
    private readonly authService: AuthService,
  ) {
  }

  get isAdmin(): boolean {
    return this.authService.currentUserRole === 'ADMIN';
  }

  ngOnInit(): void {
    this.races$ = this.raceService.getAll();
  }

  delete(id: string): void {
    if (!this.isAdmin) return;
    const ok = confirm('Are you sure you want to delete this race?');
    if (!ok) return;
    this.raceService.delete(id).subscribe(() => {
      this.races$ = this.raceService.getAll();
    });
  }
}
