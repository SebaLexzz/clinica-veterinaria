import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VeterinariaService } from '../../services/veterinaria';
import { Mascota } from '../../models/mascota';
import { MascotaCard } from './mascota-card/mascota-card';

@Component({
  selector: 'app-mascotas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MascotaCard],
  templateUrl: './mascotas.html',
  styleUrl: './mascotas.css',
})
export class Mascotas implements OnInit {
  mascotas: Mascota[] = [];
  mascotaForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private vetService: VeterinariaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mascotas = this.vetService.obtenerMascotas();

    this.mascotaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      especie: ['Perro', Validators.required],
      edad: [1, [Validators.required, Validators.min(0), Validators.max(30)]],
      dueno: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
    });
  }

  registrarMascota(): void {
    if (this.mascotaForm.invalid) {
      this.mascotaForm.markAllAsTouched();
      return;
    }

    const { nombre, especie, edad, dueno, telefono } = this.mascotaForm.value;
    this.vetService.agregarMascota(nombre, especie, edad, dueno, telefono);
    this.mascotas = this.vetService.obtenerMascotas();
    this.mascotaForm.reset({ especie: 'Perro', edad: 1 });
  }

  irAlHistorial(mascotaId: number): void {
    this.router.navigate(['/historial'], { queryParams: { mascotaId } });
  }
}