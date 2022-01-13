export class Produto{
    private _id: number;
    private _descricao: string;
    private _marca: string;
    private _valor: number;

    constructor(id: number, descricao: string, marca: string, valor: number){
        this._id = id;
        this._marca = marca;
        this._descricao = descricao;
        this._valor = valor;
    }

    public get id(){
        return this._id;
    }

    public set id(id){
        this._id = id;
    }

    public get descricao(){
        return this._descricao;
    }

    public set descricao(descricao){
        this._descricao = descricao;
    }

    public get marca(){
        return this._marca;
    }

    public set marca(marca){
        this._marca = marca;
    }

    public get valor(){
        return this._valor;
    }
    
    public set valor(valor){
        this._valor = valor;
    }

}