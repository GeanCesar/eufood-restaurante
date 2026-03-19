import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Restaurante } from "../model/restaurante";

@Injectable({providedIn: 'root'})
export class RestauranteService {

    constructor(private httpClient : HttpClient) {}

    cadastrar(restaurante : Restaurante): Observable<string> {  
    
        const url = "/restaurante/cadastrar";
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken"),
            'Content-Type': 'application/json'
        });

        return this.httpClient.post(url, restaurante, {      
            headers : headers,
            responseType: 'text'
        });
    }

    buscaRestaurante(uuidRestaurante : string): Observable<Restaurante> {
        let baseUrl = 'restaurante/consultar?uuid-restaurante=' + uuidRestaurante;

        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken"),
            'Content-Type': 'application/json'
        });

        return this.httpClient.get<Restaurante>(baseUrl, {headers : headers});
    }

    removerRestaurante(uuidRestaurante : string) : Observable<string>  {
        const url = "/restaurante/deletar";        

        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken"),
            'Content-Type': 'application/json'
        });

        const parametros = uuidRestaurante ? { params: new HttpParams().set('uuid-restaurante', uuidRestaurante), headers : headers } : {};

        return this.httpClient.delete<string>(url, parametros);
    }

    buscaImagem(restaurante: Restaurante) : Observable<Blob> {
        const url = '/restaurante/imagem_perfil?uuid-restaurante=' + restaurante.uuid;

        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken"),
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        
        return this.httpClient.get<Blob>(url, {
            headers : headers,
            responseType: 'blob' as 'json'
        });
    }

    listarPorUsuario(): Observable<Restaurante[]> {        
        const url = '/restaurante/listar/usuario';

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
        });

        return this.httpClient.get<Restaurante[]>(url, { headers : headers });
    } 
    
}