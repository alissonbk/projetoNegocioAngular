export class Endereco{
    public id: number | undefined;
    public cep: string;
    public numero: number;
    public rua: string;
    public bairro: string;
    public cidade: string;
    public estado: string;

    constructor(cep: string, numero: number, rua: string, bairro: string, cidade: string, estado: string, id?: number){
        this.id = id;
        this.cep = cep;
        this.numero = numero;
        this.rua = rua;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
    }

}