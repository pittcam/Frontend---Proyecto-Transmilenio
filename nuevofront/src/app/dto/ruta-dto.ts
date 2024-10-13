export class RutaDTO {
  constructor(
    public id: number | null,
    public nombre: string,
    public estacionesIds: number[], // IDs de las estaciones seleccionadas
    public horarioFuncionamiento: number | null,  // ID del horario seleccionado (solo uno)
  ) {}
}
