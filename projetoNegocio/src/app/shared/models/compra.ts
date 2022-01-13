import { threadId } from "worker_threads";
import { Cliente } from "./cliente";
import { Produto } from "./produto";
import { Vendedor } from "./vendedor";


export class Compra{
    private _id: number;
    private _cliente: Cliente;
    private _produto: Produto;
    private _vendedor: Vendedor;
    private _data: Date | undefined;


    constructor(id: number, cliente: Cliente, produto: Produto, vendedor: Vendedor, data?: Date){
        this._id = id;
        this._cliente = cliente;
        this._vendedor = vendedor;
        this._produto = produto;
        this._data = data;
    }


    public get id(){
        return this._id
    }
    public set id(id: number){
        this._id = id;
    }

    
    public get cliente(){
        return this._cliente;
    }
    public set cliente(cliente: Cliente){
        this._cliente = cliente;
    }


    public get produto(){
        return this._produto;
    }
    public set produto(produto: Produto){
        this._produto = produto;
    }


    public get vendedor(){
        return this._vendedor;
    }
    public set vendedor(vendedor: Vendedor){
        this._vendedor = vendedor;
    }

    
    public get data(): Date | undefined{
        return this._data;
    }


    
}