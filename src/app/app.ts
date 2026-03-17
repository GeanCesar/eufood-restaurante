import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  imports: [NgSelectModule, FormsModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App { 

  
}
