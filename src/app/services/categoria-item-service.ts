import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { CategoriaItemCardapio } from "../model/categoria-item-cardapio";

@Injectable({providedIn: 'root'})
export class CategoriaItemService {

    constructor(private httpClient : HttpClient) {}

    listarCategorias(uuidRestaurante : string): Observable<CategoriaItemCardapio[]> {
        const baseUrl = '/restaurante/categoria/listar';

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
        });
        
        const params = new HttpParams().set("uuid-restaurante", uuidRestaurante);

        const parametros = { params: params, headers : headers}

        return this.httpClient.get<CategoriaItemCardapio[]>(baseUrl, parametros);
    }

    atualizarOrdem(uuidRestaurante : string, uuidCategoria : string, ordem : number): Observable<String> {
        const baseUrl = '/restaurante/categoria/atualizar_ordem?uuid-restaurante=' + uuidRestaurante + "&ordem=" + ordem + "&uuid-categoria=" + uuidCategoria;

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
        });

        return this.httpClient.patch(baseUrl, "", {headers : headers, responseType: 'text'});
    }
}