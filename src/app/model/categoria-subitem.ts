export class CategoriaSubItem {
    nome? : string;
    editando ? : boolean = false;

    constructor(nome : string) {
        this.nome = nome;
    }
}