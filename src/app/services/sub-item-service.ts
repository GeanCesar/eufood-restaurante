import { Injectable } from "@angular/core";
import { CategoriaSubItemRest } from "../model/rest/categoria-sub-item-rest";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

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
}