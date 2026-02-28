import { Component, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'footer',
  imports: [FontAwesomeModule], 
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})

export class Footer {
  faGithub = faGithub;
}
