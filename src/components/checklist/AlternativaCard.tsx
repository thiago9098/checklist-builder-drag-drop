import { Alternativa } from '@/types/checklist';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';

interface AlternativaCardProps {
  alternativa: Alternativa;
  showStatus?: boolean;
}

export const AlternativaCard = ({ alternativa, showStatus = true }: AlternativaCardProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
        <span className="font-medium text-sm">{alternativa.nm_nome}</span>
      </div>
      {showStatus && (
        <Badge 
          variant={alternativa.id_status === 'A' ? 'default' : 'secondary'}
          className="text-xs"
        >
          {alternativa.id_status === 'A' ? 'Ativo' : 'Inativo'}
        </Badge>
      )}
    </div>
  );
};
