import { BusDTO } from './bus-dto';
import { RutaDTO } from './ruta-dto';

export class BusRutaDiaDTO {
  constructor(
    public bus: BusDTO,
    public ruta: RutaDTO,
    public dias: string[]
  ) {}
}
