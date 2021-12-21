import { Cliente } from "./cliente";
import { Produto } from "./produto";
import { Vendedor } from "./vendedor";

export interface Compra{
    cliente: Cliente;
    produto: Produto;
    vendedor: Vendedor;
    data: Date;
}