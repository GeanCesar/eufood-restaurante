import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom, timeout } from 'rxjs';
import { RespostaRequisicao } from '../model/respostaRequisicao';

@Injectable({providedIn: 'root'})
export class TokenService {
    
    constructor(private http:HttpClient) {}
    
    async validaLogin() : Promise<RespostaRequisicao>{
        const url = '/usuario_login/login/valida_token';

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
        });

        try{
            const retorno = await lastValueFrom( 
                this.http.get<RespostaRequisicao>(url,  { headers : headers}).pipe(timeout(10000))
            );
                
            return retorno;
        }catch(error) {
            return new RespostaRequisicao();
        }
    }
}

