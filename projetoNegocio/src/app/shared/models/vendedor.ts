import { Endereco } from "./endereco";

export interface Vendedor{
    nome: string;
    cpf: string;
    email: string;
    senha: string;
    access_token: string;
    endereco: Endereco;
}