export class ConductorDTO {
  constructor(
    public id: number | null,
    public nombre: string,
    public cedula: string,
    public telefono: string,
    public direccion: string
  ) {}
}
