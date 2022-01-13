export class Endereco{
    private _id: number;
    private _cep: string;
    private _numero: number;
    private _rua: string;
    private _bairro: string;
    private _cidade: string;
    private _estado: string;

    constructor(id: number, cep: string, numero: number, rua: string, bairro: string, cidade: string, estado: string){
        this._id = id;
        this._cep = cep;
        this._numero = numero;
        this._rua = rua;
        this._bairro = bairro;
        this._cidade = cidade;
        this._estado = estado;
    }

    public get id(){
        return this._id;
    }
    public set id(id){
        this._id = id;
    }

    public get cep(){
        return this._cep;
    }
    
    public set cep(cep){
        this._cep = cep;
    }

    public get numero(){
        return this._numero;
    }
    public set numero(numero){
        this._numero = numero;
    }

    public get rua(){
        return this._rua;
    }
    public set rua(rua){
        this._rua = rua;
    }

    public get bairro(){
        return this._bairro;
    }
    public set bairro(bairro){
        this._bairro = bairro;
    }

    public get cidade(){
        return this._cidade;
    }
    
    public set cidade(cidade){
        this._cidade = cidade;
    }
    public get estado(){
        return this._estado;
    }
    
    public set estado(estado){
        this._estado = estado;
    }

}