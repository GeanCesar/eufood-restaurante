export class Usuario {
  telefone? : string = "";
  senha? : string = "";

  constructor(telefone : string, senha : string) {
    this.senha = senha;
    this.telefone = telefone;
  }
}