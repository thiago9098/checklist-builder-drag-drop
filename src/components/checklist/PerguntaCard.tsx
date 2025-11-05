import { Pergunta } from '@/types/checklist';
import { Badge } from '@/components/ui/badge';
import { FileText, Trash2 } from 'lucide-react';

interface PerguntaCardProps {
  pergunta: Pergunta;
  showBadges?: boolean;
}

export const PerguntaCard = ({ pergunta, showBadges = true }: PerguntaCardProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-medium text-sm leading-tight">{pergunta.nm_nome}</h4>
      </div>
      {showBadges && (
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs">
            Tipo: {pergunta.tp_pergunta}
          </Badge>
          {pergunta.in_arquivo === 'S' && (
            <Badge variant="secondary" className="text-xs">
              <FileText className="w-3 h-3 mr-1" />
              Arquivo
            </Badge>
          )}
          {pergunta.in_arquivo_obrigatorio === 'S' && (
            <Badge variant="destructive" className="text-xs">
              Obrigatório
            </Badge>
          )}
          {pergunta.in_cacamba === 'S' && (
            <Badge variant="outline" className="text-xs">
              <Trash2 className="w-3 h-3 mr-1" />
              Caçamba
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};
