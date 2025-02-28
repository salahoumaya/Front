import { Component } from '@angular/core';
import { routes } from 'src/app/shared/service/routes/routes';
import { EventService, Event } from 'src/app/shared/service/event.service';

@Component({
  selector: 'app-instructor-notification',
  templateUrl: './instructor-notification.component.html',
  styleUrls: ['./instructor-notification.component.scss']
})
export class InstructorNotificationComponent  {
  events: Event[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  // Charger la liste des événements
  loadEvents(): void {
    this.eventService.getUpcomingEvents().subscribe(
      (data) => {
        this.events = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des événements:', error);
      }
    );
  }

  // Réserver un événement
  reserveEvent(eventId: number): void {
    this.eventService.reserveEvent(eventId).subscribe(
      () => {
        alert('Réservation effectuée avec succès !');
      },
      (error) => {
        console.error('Erreur lors de la réservation:', error);
        alert('Une erreur est survenue lors de la réservation.');
      }
    );
  }
}
