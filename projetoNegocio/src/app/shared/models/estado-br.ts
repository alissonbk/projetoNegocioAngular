export class EstadoBr {
    private _id: number;
    private _sigla: string;
    private _nome: string;

    constructor(id: number, sigla: string, nome: string){
        this._id = id;
        this._nome = nome;
        this._sigla = sigla;
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

    public get sigla(){
        return this._sigla;
    }
    public set sigla(sigla: string){
        this._sigla = sigla;
    }

}
