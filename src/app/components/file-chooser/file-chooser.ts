import { Component, Input, signal } from '@angular/core';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";

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

    file : File | null = null;

    nomeArquivo = signal("");

    onChange(event: any) {
      const file: File = event.target.files[0];

      if (file) {
        this.file = file;
      }
  }
}
