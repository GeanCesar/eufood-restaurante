import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ConsultaPedidoRest } from "../model/rest/pedido/consulta-pedido-rest";

@Injectable({providedIn: 'root'})
export class PedidoService {

    constructor(private httpClient : HttpClient) {}

    getPedidos(uuidRestaurante : string, data : string): Observable<ConsultaPedidoRest[]> {

        let baseUrl = '/pedido/restaurante/listar?uuid-restaurante=' + uuidRestaurante + "&data-inicio=" + data;

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
        });

        return this.httpClient.get<ConsultaPedidoRest[]>(baseUrl, {headers : headers});
    }

    atualizarStatusPedido(status : String, uuidRestaurante : String, uuidPedido : String) : Observable<String> {

        let baseUrl = '/pedido/atualizar/status?uuid-restaurante=' + uuidRestaurante + "&status=" + status + "&uuid-pedido=" + uuidPedido;

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
        });

        return this.httpClient.patch<String>(baseUrl, "", {headers : headers});

    }
}