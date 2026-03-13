import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, timeout } from 'rxjs';

@Injectable({providedIn: 'root'})
export class TokenService {
    
    constructor(private http:HttpClient) {}
    
    async validaLogin() : Promise<string>{
        const url = '/usuario_login/login/valida_token';

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
        });

        try{
            const retorno = await lastValueFrom( 
                this.http.get(url,  { headers : headers, responseType: 'text'}).pipe(timeout(10000))
            );
                
            return retorno;
        }catch(error) {
            return "";
        }
    }
}

