import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { IEvent } from '../Models/event.interface';
import { EventService } from '../Services/event.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})

export class EventDetailsComponent implements OnInit {
  loading = true;
  id: number = 0;
  eventListItem$!: Observable<IEvent[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 1000);

    this.id = Number(this.route.snapshot.paramMap.get('id'))
    if (this.id > 0) {
      this.getEvent(this.id);
    }

  }

  getEvent(id: number) {
    this.eventListItem$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.eventService.getEventByIdFromAPI(this.id))
    );
  }
  
  onBackClick() {
    this.router.navigate(["/events"]);
  }

}
