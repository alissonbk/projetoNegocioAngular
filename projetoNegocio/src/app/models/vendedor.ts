import { Endereco } from "./endereco";

export interface Vendedor{
    nome: string;
    cpf: string;
    email: string;
    senha: string;
    endereco: Endereco;
}