import { Endereco } from "./endereco";

export interface Cliente{
    nome: string;
    cpf: string;
    email: string;
    endereco: Endereco;
}