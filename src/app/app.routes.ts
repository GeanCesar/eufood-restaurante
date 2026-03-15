import { Routes } from '@angular/router';
import { Login } from './controller/login/login';
import { Restaurantes } from './controller/listagem-restaurantes/restaurantes';
import { AuthGuard } from './auth/auth-guard';
import { CadastroItemCardapio } from './controller/cadastro-item-cardapio/cadastro-item-cardapio';
import { SelecaoSubItem } from './controller/selecao-sub-item/selecao-sub-item';
import { AlteracaoCardapioItem } from './controller/alteracao-cardapio-item/alteracao-cardapio-item';
import { Dashboard } from './controller/dashboard/dashboard';
import { ListagemPedidos } from './controller/listagem-pedidos/listagem-pedidos';

export const routes: Routes = [
    {path: "controller/login", component : Login},
    {path: "controller/restaurantes", component : Restaurantes, canActivate: [AuthGuard]},
    {path: "controller/cadastro-item-cardapio", component : CadastroItemCardapio, data: {uuid_restaurante: "", uuid_item: ""}, canActivate: [AuthGuard]},
    {path: "controller/selecao-sub-item/:uuid-item-principal", component : SelecaoSubItem, canActivate: [AuthGuard]},
    {path: "controller/alteracao-item-cardapio", component : AlteracaoCardapioItem, canActivate: [AuthGuard]},    
    {path: "controller/dashboard", component : Dashboard, data: {uuid_restaurante: ""}, canActivate: [AuthGuard]},
    {path: "controller/listagem-pedidos", component : ListagemPedidos, data: {uuid_restaurante: ""}, canActivate: [AuthGuard]},
    {path: "", redirectTo: "controller/login", pathMatch: "full"}
];
