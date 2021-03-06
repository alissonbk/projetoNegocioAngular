import { Endereco } from './endereco';


export class Vendedor{
    public id: number | undefined;
    public nome: string;
    public cpf: string;
    public email: string;
    public senha: string;
    public access_token: string | undefined;
    public endereco: Endereco;

    constructor(nome: string, cpf: string, email: string, senha: string, endereco: Endereco, id?: number){
        this.id = id;
        this.cpf = cpf;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.endereco = endereco;
    }

}