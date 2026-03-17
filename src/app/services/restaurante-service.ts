import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Restaurante } from "../model/restaurante";

@Injectable({providedIn: 'root'})
export class RestauranteService {

    constructor(private httpClient : HttpClient) {}

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
}