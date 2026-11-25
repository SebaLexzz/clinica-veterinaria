import { Injectable } from '@angular/core';
import { Mascota, IMascota } from '../models/mascota';
import { Cita } from '../models/cita';

@Injectable({
  providedIn: 'root',
})
export class VeterinariaService {
  private readonly KEY_MASCOTAS = 'vet_mascotas';
  private readonly KEY_CITAS = 'vet_citas';

  private mascotas: Mascota[] = [];
  private citas: Cita[] = [];

  constructor() {
    this.cargarDatos();
  }

  private cargarDatos(): void {
    const mascotasGuardadas = localStorage.getItem(this.KEY_MASCOTAS);
    const citasGuardadas = localStorage.getItem(this.KEY_CITAS);

    if (mascotasGuardadas) {
      const data: IMascota[] = JSON.parse(mascotasGuardadas);
      this.mascotas = data.map(
        (m) => new Mascota(m.nombre, m.especie, m.edad, m.dueno, m.telefono, m.id)
      );
    } else {
      this.mascotas = [
        new Mascota('Firulais', 'Perro', 3, 'Carlos Pérez', '987654321', 1),
        new Mascota('Michi', 'Gato', 2, 'Ana Torres', '912345678', 2),
      ];
      this.guardarMascotas();
    }

    if (citasGuardadas) {
      this.citas = JSON.parse(citasGuardadas);
    } else {
      const hoy = new Date().toISOString().split('T')[0];
      this.citas = [
        {
          id: 101,
          mascotaId: 1,
          mascotaNombre: 'Firulais',
          fecha: hoy,
          hora: '10:30',
          motivo: 'Vacuna antirrábica',
          estado: 'Pendiente',
        },
        {
          id: 102,
          mascotaId: 2,
          mascotaNombre: 'Michi',
          fecha: '2026-11-20',
          hora: '16:00',
          motivo: 'Control general',
          estado: 'Atendida',
          diagnostico: 'Saludable, desparasitación aplicada.',
        },
      ];
      this.guardarCitas();
    }
  }

  private guardarMascotas(): void {
    localStorage.setItem(this.KEY_MASCOTAS, JSON.stringify(this.mascotas));
  }

  private guardarCitas(): void {
    localStorage.setItem(this.KEY_CITAS, JSON.stringify(this.citas));
  }

  obtenerMascotas(): Mascota[] {
    return this.mascotas;
  }

  agregarMascota(
    nombre: string,
    especie: 'Perro' | 'Gato' | 'Otro',
    edad: number,
    dueno: string,
    telefono: string
  ): void {
    const nueva = new Mascota(nombre, especie, edad, dueno, telefono);
    this.mascotas.push(nueva);
    this.guardarMascotas();
  }

  obtenerCitas(): Cita[] {
    return this.citas.sort((a, b) => a.fecha.localeCompare(b.fecha));
  }

  agregarCita(mascotaId: number, fecha: string, hora: string, motivo: string): void {
    const mascota = this.mascotas.find((m) => m.id === Number(mascotaId));
    if (!mascota) return;

    const nuevaCita: Cita = {
      id: Date.now(),
      mascotaId: mascota.id,
      mascotaNombre: mascota.nombre,
      fecha,
      hora,
      motivo,
      estado: 'Pendiente',
    };
    this.citas.push(nuevaCita);
    this.guardarCitas();
  }

  marcarComoAtendida(citaId: number): void {
    const cita = this.citas.find((c) => c.id === citaId);
    if (cita) {
      cita.estado = 'Atendida';
      this.guardarCitas();
    }
  }

  guardarDiagnostico(citaId: number, diagnostico: string): void {
    const cita = this.citas.find((c) => c.id === citaId);
    if (cita) {
      cita.diagnostico = diagnostico;
      cita.estado = 'Atendida';
      this.guardarCitas();
    }
  }

  obtenerHistorialPorMascota(mascotaId: number): Cita[] {
    return this.citas.filter((c) => c.mascotaId === Number(mascotaId));
  }
}