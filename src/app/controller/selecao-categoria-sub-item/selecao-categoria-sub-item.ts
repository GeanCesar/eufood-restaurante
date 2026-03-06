import { Component } from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faGrip } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';

import { CategoriaSubItem } from '../../model/categoria-subitem';
import { Button } from "../../components/button/button";
import { Textfield } from "../../components/textfield/textfield";
import { Datalist } from "../../components/datalist/datalist";
import { OptionDataList } from '../../model/option-datalist';

@Component({
  selector: 'app-selecao-categoria-sub-item',
  imports: [CdkDropList, CdkDrag, FaIconComponent, Button, Textfield, FormsModule, Datalist],
  templateUrl: './selecao-categoria-sub-item.html',
  styleUrl: './selecao-categoria-sub-item.css',
})

export class SelecaoCategoriaSubItem {


  faGrip = faGrip;
  faCircle = faCircle;

  categorias = [new CategoriaSubItem("Categoria 1"), new CategoriaSubItem("Categoria 2"), new CategoriaSubItem("Categoria 3")];

  categoriaSelecionada? : string;

  editando : boolean = false;

  drop(event: CdkDragDrop<CategoriaSubItem[]>) {
    moveItemInArray(this.categorias, event.previousIndex, event.currentIndex);
  }

  adicionaNovo() {
    const categoria = new CategoriaSubItem("Categoria " + (this.categorias.length + 1));
    categoria.editando = true;
    this.categorias.unshift(categoria);
  }

  iniciaEdicao(categoria : CategoriaSubItem) {
    categoria.editando = true;
  }

  finalizaEdicao(categoria : CategoriaSubItem) {
    categoria.editando = false;
  }


  getCategorias() : OptionDataList[] {
    let options : OptionDataList[] = [];

    for(let categoria of this.categorias) {
      const option = new OptionDataList();
      option.objeto = categoria;
      option.texto = categoria.nome;
      options.push(option);
    }   

    return options;
  }

}
