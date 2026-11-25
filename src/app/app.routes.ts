import { Routes } from '@angular/router';
import { Mascotas } from './features/mascotas/mascotas';
import { Citas } from './features/citas/citas';
import { Historial } from './features/historial/historial';

export const routes: Routes = [
  { path: '', redirectTo: 'mascotas', pathMatch: 'full' },
  { path: 'mascotas', component: Mascotas },
  { path: 'citas', component: Citas },
  { path: 'historial', component: Historial },
  { path: 'historial/:id', component: Historial },
  { path: '**', redirectTo: 'mascotas' },
];