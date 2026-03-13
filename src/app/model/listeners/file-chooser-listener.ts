export interface IFileChooserListener {
    onSeleciona(arquivoCarregado ? : string | ArrayBuffer | null) : void;
}