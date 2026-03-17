import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ConsultaControlePedidoRest } from "../model/rest/pedido/controle-pedidos-rest";

@Injectable({providedIn: 'root'})
export class ControlePedidosService {

    constructor(private httpClient : HttpClient) {}

    getControle(uuidRestaurante : string): Observable<ConsultaControlePedidoRest> {

        let baseUrl = '/controle_pedido/consultar?uuid-restaurante=' + uuidRestaurante;

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
        });

        return this.httpClient.get<ConsultaControlePedidoRest>(baseUrl, {headers : headers});
    }
}