import { Endereco } from './endereco';


export class Vendedor{
    private _id: number;
    private _nome: string;
    private _cpf: string;
    private _email: string;
    private _senha: string;
    private _access_token: string;
    private _endereco: Endereco;

    constructor(id: number, nome: string, cpf: string, email: string, senha: string, access_token: string, endereco: Endereco){
        this._id = id;
        this._cpf = cpf;
        this._nome = nome;
        this._email = email;
        this._senha = senha;
        this._access_token = access_token;
        this._endereco = endereco;
    }

    public get id(){
        return this._id;
    }
    public set id(id){
        this._id = id;
    }


    public get nome(){
        return this._nome;
    }
    public set nome(nome){
        this._nome = nome;
    }


    public get cpf(){
        return this._cpf;
    }
    public set cpf(cpf){
        this._cpf = cpf;
    }


    public get email(){
        return this._email;
    }
    public set email(email){
        this._email = email;
    }


    public get senha(){
        return this._senha;
    }
    public set senha(senha){
        this._senha = senha;
    }


    public get access_token(){
        return this._access_token;
    }
    public set access_token(access_token){
        this._access_token = access_token;
    }


    public get endereco(){
        return this._endereco;
    }
    public set endereco(endereco){
        this._endereco = endereco;
    }



}