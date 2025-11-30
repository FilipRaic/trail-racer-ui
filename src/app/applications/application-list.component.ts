import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ApplicationService} from '../service/application.service';
import {Application} from '../model/application';
import {Observable, of} from 'rxjs';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-application-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './application-list.component.html'
})
export class ApplicationListComponent implements OnInit {
  applications$: Observable<Application[]> = of([]);

  constructor(private readonly authService: AuthService,
              private readonly applicationService: ApplicationService) {
  }

  ngOnInit(): void {
    this.applications$ = this.applicationService.getAll();
  }

  get isApplicant(): boolean {
    return this.authService.currentUserRole === 'APPLICANT';
  }

  delete(application: Application): void {
    const ok = confirm('Are you sure you want to delete this application?');
    if (!ok) return;

    this.applicationService.delete(application).subscribe(() => {
      this.applications$ = this.applicationService.getAll();
    });
  }
}
