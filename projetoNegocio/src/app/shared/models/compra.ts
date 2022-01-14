import { threadId } from "worker_threads";
import { Cliente } from "./cliente";
import { Produto } from "./produto";
import { Vendedor } from "./vendedor";


export class Compra{
    public id: number | undefined;
    public cliente: Cliente;
    public produto: Produto;
    public vendedor: Vendedor;
    public data: Date | undefined;


    constructor(cliente: Cliente, produto: Produto, vendedor: Vendedor, id?: number, data?: Date){
        this.id = id;
        this.cliente = cliente;
        this.vendedor = vendedor;
        this.produto = produto;
        this.data = data;
    }


    
}