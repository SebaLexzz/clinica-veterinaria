export type EstadoCita = 'Pendiente' | 'Atendida';

export interface Cita {
  id: number;
  mascotaId: number;
  mascotaNombre: string;
  fecha: string;       
  hora: string;        
  motivo: string;
  estado: EstadoCita;
  diagnostico?: string;
}