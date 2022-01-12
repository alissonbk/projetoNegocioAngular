export class Produto{
    private _id: number | undefined;
    private _descricao: string | undefined;
    private _marca: string | undefined;
    private _valor: number | undefined;

    constructor(id?: number, descricao?: string, marca?: string, valor?: number){
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