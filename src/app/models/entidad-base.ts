export class EntidadBase {
  public id: number;
  public fechaCreacion: string;

  constructor(id?: number) {
    this.id = id ?? Date.now();
    this.fechaCreacion = new Date().toISOString().split('T')[0];
  }
}