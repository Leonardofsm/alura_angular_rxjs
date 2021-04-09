import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, pluck } from 'rxjs/operators'
import { Acao, AcoesAPI } from './modelo/acoes';

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(private httpCliente: HttpClient) { }

  getAcoes(){
    return this.httpCliente.get<AcoesAPI>('http://localhost:3000/acoes')
    .pipe(
      tap((valor) => console.log(valor)),
      pluck('payload'),
      map((acoes) => acoes.sort((acaoA, AcaoB) => this.ordenaPorCodigo(acaoA, AcaoB))
    )
    );
  }
  private ordenaPorCodigo(acaoA: Acao, AcaoB: Acao) {
    if(acaoA.codigo > AcaoB.codigo) {
      return 1;
    }
    if(acaoA.codigo < AcaoB.codigo) {
      return -1;
    }
    return 0;
  }
}
