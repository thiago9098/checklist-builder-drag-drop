import { Checklist, Pergunta, Alternativa, GrupoPergunta } from '@/types/checklist';

export const mockChecklists: Checklist[] = [
  {
    ds_imagem_logo: "https://politicas.sigra.com.br/LOGO/leroymerlyn.png",
    dt_cadastro: "Mon, 08 Aug 2022 15:54:44 GMT",
    dt_fim: null,
    dt_inicio: "Sat, 08 Jan 2022 00:00:00 GMT",
    id_checklist: 0,
    id_status: "A",
    id_usuario_inclusao: null,
    nm_nome: "Leroy Merlin",
    nr_versao: 1,
    tp_checklist: "PP"
  }
];

export const mockPerguntas: Pergunta[] = [
  {
    id_pergunta: 1,
    in_arquivo: "N",
    in_arquivo_obrigatorio: "N",
    in_cacamba: "N",
    nm_nome: "OS FUNCIONÁRIOS UTILIZAM CORRETAMENTE OS EPIS?",
    tp_pergunta: "O"
  },
  {
    id_pergunta: 2,
    in_arquivo: "S",
    in_arquivo_obrigatorio: "S",
    in_cacamba: "N",
    nm_nome: "AS INSTALAÇÕES ELÉTRICAS ESTÃO EM CONFORMIDADE?",
    tp_pergunta: "O"
  },
  {
    id_pergunta: 3,
    in_arquivo: "N",
    in_arquivo_obrigatorio: "N",
    in_cacamba: "S",
    nm_nome: "O LOCAL ESTÁ LIMPO E ORGANIZADO?",
    tp_pergunta: "M"
  },
  {
    id_pergunta: 4,
    in_arquivo: "N",
    in_arquivo_obrigatorio: "N",
    in_cacamba: "N",
    nm_nome: "EXISTE SINALIZAÇÃO DE SEGURANÇA ADEQUADA?",
    tp_pergunta: "O"
  },
  {
    id_pergunta: 5,
    in_arquivo: "S",
    in_arquivo_obrigatorio: "N",
    in_cacamba: "N",
    nm_nome: "OS EXTINTORES ESTÃO DENTRO DO PRAZO DE VALIDADE?",
    tp_pergunta: "O"
  }
];

export const mockAlternativas: Alternativa[] = [
  {
    dt_cadastro: "Mon, 08 Aug 2022 17:04:27 GMT",
    id_alternativa: 1,
    id_status: "A",
    id_usuario_inclusao: "admin",
    nm_nome: "SIM"
  },
  {
    dt_cadastro: "Mon, 08 Aug 2022 17:04:30 GMT",
    id_alternativa: 2,
    id_status: "A",
    id_usuario_inclusao: "admin",
    nm_nome: "NÃO"
  },
  {
    dt_cadastro: "Mon, 08 Aug 2022 17:04:35 GMT",
    id_alternativa: 3,
    id_status: "A",
    id_usuario_inclusao: "admin",
    nm_nome: "PARCIALMENTE"
  },
  {
    dt_cadastro: "Mon, 08 Aug 2022 17:04:40 GMT",
    id_alternativa: 4,
    id_status: "A",
    id_usuario_inclusao: "admin",
    nm_nome: "NÃO SE APLICA"
  }
];

export const mockGrupoPerguntas: GrupoPergunta[] = [
  {
    id_checklist: 0,
    id_grupo_pergunta: 0,
    nm_ordem: 1
  },
  {
    id_checklist: 0,
    id_grupo_pergunta: 1,
    nm_ordem: 2
  }
];
