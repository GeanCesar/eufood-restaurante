import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { IFileChooserListener } from '../../model/listeners/file-chooser-listener';

@Component({
  selector: 'app-file-chooser',
  imports: [FaIconComponent],
  templateUrl: './file-chooser.html',
  styleUrl: './file-chooser.css',
})

export class FileChooser {
    faUpload = faUpload;

    @Input() textoPlaceholder? : string;
    @Input() texto? : string;
    
    arquivoCarregado ? : string | ArrayBuffer | null;

    file : File | null = null;

    nomeArquivo = signal("");

    listener ? : IFileChooserListener;
    
    @Output() onChangeFile = new EventEmitter();

    onChange(event: any) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();

        reader.onload = (event: ProgressEvent) => {
          this.arquivoCarregado = (<FileReader> event.target).result;
          if(this.listener) {
            this.listener.onSeleciona(this.arquivoCarregado);
          }
          this.onChangeFile.emit(this.arquivoCarregado);
        }

        reader.readAsDataURL(event.target.files[0]);
      }

      const file: File = event.target.files[0];

      if (file) {
        this.file = file;
      }
  }

  setListener(listener : IFileChooserListener){
    this.listener = listener;
  }
}
