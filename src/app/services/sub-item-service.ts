import { Injectable } from "@angular/core";
import { CategoriaSubItemRest } from "../model/rest/cardapio/categoria-sub-item-rest";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { ItemCardapio } from "../model/item-cardapio";

@Injectable({providedIn: 'root'})
export class SubItemService {

    constructor(private httpClient : HttpClient) {}

    getCategorias(uuidRestaurante : string, uuidItem : String): Observable<CategoriaSubItemRest[]> {

        let baseUrl = '/restaurante/categoria/listar/item?uuid-restaurante=' + uuidRestaurante + "&uuid-item=" + uuidItem;

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
        });

        return this.httpClient.get<CategoriaSubItemRest[]>(baseUrl, {headers : headers});
    }

    // Atualiza ordens dos itens via requisição PATCH
    enviaAtualizacaoOrdem(uuid : string, ordem : number) : Observable<string> {
        const url = '/restaurante/sub_item/atualizar_ordem';

        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken"),
            'Content-Type': 'application/json'
        });

        const params = new HttpParams().set("uuid-item-subitem", uuid).set("ordem", ordem.toString());

        const parametros = { params: params, headers : headers}

        return this.httpClient.patch<string>(url, "", parametros);        
    }

    // Executa o GET para listagem de subitens
    listaSubitens(uuidRestaurante : string) : Observable<ItemCardapio[]>{
        const url = '/restaurante/sub_item/listar?uuid-restaurante=' + uuidRestaurante;

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
        });

        return this.httpClient.get<ItemCardapio[]>(url,  { headers : headers});
    }
}