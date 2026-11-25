import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { VeterinariaService } from '../../services/veterinaria';
import { Mascota } from '../../models/mascota';
import { Cita } from '../../models/cita';
import { EstadoCitaPipe } from '../../shared/pipes/estado-cita-pipe';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, EstadoCitaPipe],
  templateUrl: './historial.html',
  styleUrl: './historial.css',
})
export class Historial implements OnInit {
  mascotas: Mascota[] = [];
  mascotaSeleccionadaId: number | null = null;
  historialCitas: Cita[] = [];

  constructor(
    private vetService: VeterinariaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.mascotas = this.vetService.obtenerMascotas();

    this.route.queryParams.subscribe((params) => {
      if (params['mascotaId']) {
        this.seleccionarMascota(Number(params['mascotaId']));
      } else if (this.mascotas.length > 0) {
        this.seleccionarMascota(this.mascotas[0].id);
      }
    });
  }

  seleccionarMascota(id: number): void {
    this.mascotaSeleccionadaId = id;
    this.historialCitas = this.vetService.obtenerHistorialPorMascota(id);
  }

  onCambioMascota(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.seleccionarMascota(Number(select.value));
  }

  guardarNota(citaId: number, diagnostico: string): void {
    if (!diagnostico.trim()) return;
    this.vetService.guardarDiagnostico(citaId, diagnostico.trim());
    if (this.mascotaSeleccionadaId) {
      this.historialCitas = this.vetService.obtenerHistorialPorMascota(
        this.mascotaSeleccionadaId
      );
    }
  }
}