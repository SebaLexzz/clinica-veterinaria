import { Pipe, PipeTransform } from '@angular/core';
import { EstadoCita } from '../../models/cita';

@Pipe({
  name: 'estadoCita',
  standalone: true,
})
export class EstadoCitaPipe implements PipeTransform {
  transform(estado: EstadoCita): string {
    if (estado === 'Atendida') {
      return '✅ Atendida';
    }
    return '⏳ Pendiente';
  }
}