import { Optional } from 'sequelize';

export interface ClienteInterface {
    id: number;
    nombre: string;
    email: string;
    direccion: string;
    password: string;
    role: string;
  }
  
  export interface ClienteCreationInterface extends Optional<ClienteInterface, 'id'> {}
  