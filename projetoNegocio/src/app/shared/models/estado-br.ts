export class EstadoBr {
    public id: number | undefined;
    public sigla: string;
    public nome: string;

    constructor(sigla: string, nome: string, id?: number){
        this.id = id;
        this.nome = nome;
        this.sigla = sigla;
    }
}
