export class RutaDTO {
  constructor(
    public id: number | null,
    public nombre: string,
    public estacionesIds: number[], // IDs de las estaciones seleccionadas
    public horarioInicio: number,
    public horarioFinal: number,
    public dias: number[]
  ) {}
}
