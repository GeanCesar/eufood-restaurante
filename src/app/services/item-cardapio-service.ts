import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class ItemCardapioService {

    constructor(private httpClient : HttpClient) {}

    buscaImagem(uuidItem : string): Observable<Blob> {
        let baseUrl = 'restaurante/sub_item/imagem_item?uuid-item-cardapio=' + uuidItem

        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken"),
            'Accept': 'image/png',
          });

        return this.httpClient.get<Blob>(baseUrl, {
            headers : headers,
            responseType: 'blob' as 'json'
        });
    }

    removerItem(uuidRestaurante : string, uuidItem : string) : Observable<boolean> {
        let baseUrl = 'restaurante/item_cardapio/remover?uuid-restaurante=' + uuidRestaurante + '&uuid-item=' + uuidItem

        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
        });

        return this.httpClient.delete<boolean>(baseUrl, { headers : headers});
    }

    atualizaOrdem(uuidRestaurante : string, uuidItem : string, ordem : number) : Observable<string> {
        let baseUrl = 'restaurante/item_cardapio/atualiza_ordem';

        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken"),
            'Content-Type': 'application/json'
        });

        const params = new HttpParams().set("uuid-restaurante", uuidRestaurante).set("ordem", ordem.toString()).set("uuid-item", uuidItem);

        const parametros = { params: params, headers : headers}

        return this.httpClient.patch<string>(baseUrl, "", parametros);
    }
}