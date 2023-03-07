import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';
import { IEvent } from '../Models/event.interface';
import { EventService } from '../Services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  eventLists$!: Observable<IEvent[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private eventService : EventService
  ) {

  }
  ngOnInit(): void {
    this.eventLists$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.eventService.getAllEventsFromAPI();
      })
    );
  };

  onEventClick(id: number): void {
    this.router.navigate(['/event/' + id]);
  }
}
