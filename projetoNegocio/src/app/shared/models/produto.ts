export class Produto{
    public id: number | undefined;
    public descricao: string;
    public marca: string;
    public valor: number;


    constructor(descricao: string, marca: string, valor: number, id?: number){
        this.id = id;
        this.marca = marca;
        this.descricao = descricao;
        this.valor = valor;
    }

}