export class RutaDTO {
  constructor(
    public id: number | null,
    public nombre: string,
    public estacionesIds: number[], // IDs de las estaciones seleccionadas
    public horaInicio: number,
    public horaFinal: number,
    public dias: string[],
  ) {}
}
