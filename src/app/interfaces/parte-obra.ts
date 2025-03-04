export interface ParteObra {
  id?: string;
  obraId: string;
  empleadoId: string;
  nombreCompletoCliente: string;
  fecha: Date;
  horas: number;
  concepto: string;
  observaciones?: string;
}