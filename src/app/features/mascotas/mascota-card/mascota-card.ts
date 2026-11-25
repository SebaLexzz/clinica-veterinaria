import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Mascota } from '../../../models/mascota';

@Component({
  selector: 'app-mascota-card',
  standalone: true,
  imports: [],
  templateUrl: './mascota-card.html',
  styleUrl: './mascota-card.css',
})
export class MascotaCard {
  @Input() mascota!: Mascota;
  @Output() verHistorial = new EventEmitter<number>();

  onVerHistorial(): void {
    this.verHistorial.emit(this.mascota.id);
  }
}