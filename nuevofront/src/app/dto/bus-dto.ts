// bus-dto.ts
import { RutaDTO } from './ruta-dto';

export class BusDTO {
  constructor(
    public id: number | null,
    public placa: string,
    public modelo: string,
    public rutas: RutaDTO[] = []  // Asegúrate de que esta propiedad existe
  ) {}
}
