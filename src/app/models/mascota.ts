import { EntidadBase } from './entidad-base';

export interface IMascota {
  id: number;
  nombre: string;
  especie: 'Perro' | 'Gato' | 'Otro';
  edad: number;
  dueno: string;
  telefono: string;
  fechaCreacion: string;
}

export class Mascota extends EntidadBase implements IMascota {
  nombre: string;
  especie: 'Perro' | 'Gato' | 'Otro';
  edad: number;
  dueno: string;
  telefono: string;

  constructor(
    nombre: string,
    especie: 'Perro' | 'Gato' | 'Otro',
    edad: number,
    dueno: string,
    telefono: string,
    id?: number
  ) {
    super(id); 
    this.nombre = nombre;
    this.especie = especie;
    this.edad = edad;
    this.dueno = dueno;
    this.telefono = telefono;
  }


  obtenerResumen(): string {
    return `${this.nombre} (${this.especie}, ${this.edad} años) - Dueño: ${this.dueno}`;
  }
}