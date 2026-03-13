import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})

export class Header {

  faArrowRightFromBracket = faArrowRightFromBracket;

  constructor(private router : Router, private route : ActivatedRoute) {}

  nomeUsuario : string = sessionStorage.getItem("nameUser") as string;

  deslogar() {
    sessionStorage.clear();

    this.router.navigate(['/controller/login'], { relativeTo: this.route });
  }

  selecaoRestaurante() {
    this.router.navigate(['controller/restaurantes']);
  }

}
