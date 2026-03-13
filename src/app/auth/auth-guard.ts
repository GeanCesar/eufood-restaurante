import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from './token.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor( private router : Router, private  route : ActivatedRoute) {}

  private tokenService = inject(TokenService);

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.validaLogin().then(value => {
      if(value) {
        return true;
      } else {
        this.router.navigate(['/controller/login'], { relativeTo: this.route });
        return false;
      }
    });
  }

  async validaLogin() : Promise<boolean> {
    const resposta : string = await this.tokenService.validaLogin();

    let retorno = (resposta) ? true : false;
    if(retorno) {
      sessionStorage.setItem("nameUser", resposta);
    }
    return retorno;
  }

}

