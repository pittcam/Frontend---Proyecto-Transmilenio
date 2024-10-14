export class RutaDTO {
  constructor(
    public id: number | null,
    public nombre: string,
    public estacionesIds: number[],  // Volvemos a usar IDs
    public horaInicio: string,
    public horaFin: string,
    public dias: string[]
  ) {}
}
