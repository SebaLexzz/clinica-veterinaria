import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VeterinariaService } from '../../services/veterinaria';
import { Mascota } from '../../models/mascota';
import { Cita } from '../../models/cita';
import { EstadoCitaPipe } from '../../shared/pipes/estado-cita-pipe';
import { ResaltarCitaDirective } from '../../shared/directives/resaltar-cita';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EstadoCitaPipe,
    ResaltarCitaDirective,
  ],
  templateUrl: './citas.html',
  styleUrl: './citas.css',
})
export class Citas implements OnInit {
  mascotas: Mascota[] = [];
  citas: Cita[] = [];
  citaForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private vetService: VeterinariaService
  ) {}

  ngOnInit(): void {
    this.mascotas = this.vetService.obtenerMascotas();
    this.citas = this.vetService.obtenerCitas();

    const hoy = new Date().toISOString().split('T')[0];

    this.citaForm = this.fb.group({
      mascotaId: ['', Validators.required],
      fecha: [hoy, Validators.required],
      hora: ['10:00', Validators.required],
      motivo: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  agendarCita(): void {
    if (this.citaForm.invalid) {
      this.citaForm.markAllAsTouched();
      return;
    }

    const { mascotaId, fecha, hora, motivo } = this.citaForm.value;
    this.vetService.agregarCita(Number(mascotaId), fecha, hora, motivo);
    this.citas = this.vetService.obtenerCitas();
    this.citaForm.patchValue({ motivo: '' });
  }

  marcarAtendida(citaId: number): void {
    this.vetService.marcarComoAtendida(citaId);
    this.citas = this.vetService.obtenerCitas();
  }
}