import { Ator } from "./ator"
import { Classe } from "./classe"
import { Diretor } from "./diretor"

export interface Titulo{
    id: string,
    nome: string,
    atores: Ator[],
    diretor: Diretor,
    ano: string,
    sinopse: string,
    categoria: string,
    classe: Classe

}
