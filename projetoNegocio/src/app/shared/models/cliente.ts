import { Endereco } from "./endereco";


export class Cliente{
    private _id: number;
    private _nome: string;
    private _cpf: string;
    private _email: string;
    private _endereco: Endereco;

    constructor(id: number, nome: string, cpf: string, email: string, endereco: Endereco){
        this._id = id;
        this._nome = nome;
        this._cpf = cpf;
        this._email = email;
        this._endereco = endereco;
    }

    public get id(){
        return this._id;
    }
    public set id(id: number){
        this._id = id;
    }


    public get nome(){
        return this._nome;
    }
    public set nome(nome: string){
        this._nome = nome;
    }


    public get cpf(){
        return this._cpf;
    }
    public set cpf(cpf: string){
        this._cpf = cpf;
    }


    public get email(){
        return this._email;
    }
    public set email(email: string){
        this._email = email;
    }
    

    public get endereco(){
        return this._endereco;
    }
    public set endereco(endereco){
        this._endereco = endereco;
    }

}