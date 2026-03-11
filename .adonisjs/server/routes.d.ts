import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'login.login': { paramsTuple?: []; params?: {} }
    'compras.store': { paramsTuple?: []; params?: {} }
    'gateways.index': { paramsTuple?: []; params?: {} }
    'gateways.toggle': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'gateways.priority': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'produtos.index': { paramsTuple?: []; params?: {} }
    'produtos.store': { paramsTuple?: []; params?: {} }
    'produtos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'produtos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'produtos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'clientes.index': { paramsTuple?: []; params?: {} }
    'clientes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'transacoes.index': { paramsTuple?: []; params?: {} }
    'transacoes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'login.logout': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'login.login': { paramsTuple?: []; params?: {} }
    'compras.store': { paramsTuple?: []; params?: {} }
    'produtos.store': { paramsTuple?: []; params?: {} }
    'login.logout': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'gateways.index': { paramsTuple?: []; params?: {} }
    'produtos.index': { paramsTuple?: []; params?: {} }
    'produtos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'clientes.index': { paramsTuple?: []; params?: {} }
    'clientes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'transacoes.index': { paramsTuple?: []; params?: {} }
    'transacoes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'gateways.index': { paramsTuple?: []; params?: {} }
    'produtos.index': { paramsTuple?: []; params?: {} }
    'produtos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'clientes.index': { paramsTuple?: []; params?: {} }
    'clientes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'transacoes.index': { paramsTuple?: []; params?: {} }
    'transacoes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PUT: {
    'gateways.toggle': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'gateways.priority': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'produtos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'produtos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}