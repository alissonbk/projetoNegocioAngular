import { Endereco } from "./endereco";


export class Cliente{
    public id: number | undefined;
    public nome: string;
    public cpf: string;
    public email: string;
    public endereco: Endereco;

    constructor(nome: string, cpf: string, email: string, endereco: Endereco, id?: number){
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.endereco = endereco;
    }
}