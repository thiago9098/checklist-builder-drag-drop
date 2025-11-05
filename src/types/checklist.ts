export interface Checklist {
  ds_imagem_logo: string;
  dt_cadastro: string;
  dt_fim: string | null;
  dt_inicio: string;
  id_checklist: number;
  id_status: string;
  id_usuario_inclusao: string | null;
  nm_nome: string;
  nr_versao: number;
  tp_checklist: string;
}

export interface Pergunta {
  id_pergunta: number;
  in_arquivo: "S" | "N";
  in_arquivo_obrigatorio: "S" | "N";
  in_cacamba: "S" | "N";
  nm_nome: string;
  tp_pergunta: string;
}

export interface Alternativa {
  dt_cadastro: string;
  id_alternativa: number;
  id_status: string;
  id_usuario_inclusao: string;
  nm_nome: string;
}

export interface GrupoPergunta {
  id_grupo_pergunta: number;
  nm_nome: string;
  ds_imagem?: string;
  nm_ordem: number;
  perguntas: PerguntaComAlternativas[];
}

export interface PerguntaComAlternativas extends Pergunta {
  alternativas: Alternativa[];
  nm_ordem: number;
}

export interface ChecklistCompleto {
  checklist: Checklist;
  grupo_perguntas: GrupoPergunta[];
}
