import { useDroppable } from '@dnd-kit/core';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PerguntaCard } from './PerguntaCard';
import { AlternativaCard } from './AlternativaCard';
import { Trash2 } from 'lucide-react';
import { PerguntaComAlternativas } from '@/types/checklist';

interface PerguntaDroppableCardProps {
  pergunta: PerguntaComAlternativas;
  pIndex: number;
  grupoId: number;
  onRemovePergunta: (grupoId: number, perguntaId: number) => void;
  onRemoveAlternativa: (grupoId: number, perguntaId: number, alternativaId: number) => void;
}

export const PerguntaDroppableCard = ({
  pergunta,
  pIndex,
  grupoId,
  onRemovePergunta,
  onRemoveAlternativa
}: PerguntaDroppableCardProps) => {
  const { setNodeRef: setPerguntaRef, isOver: isOverPergunta } = useDroppable({
    id: `pergunta-${grupoId}-${pergunta.id_pergunta}`,
    data: { 
      type: 'pergunta', 
      grupoId: grupoId,
      perguntaId: pergunta.id_pergunta 
    }
  });

  return (
    <Card className="p-4 bg-secondary/20">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs font-semibold">
          {pIndex + 1}
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between">
            <PerguntaCard pergunta={pergunta} />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemovePergunta(grupoId, pergunta.id_pergunta)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
          
          <div 
            ref={setPerguntaRef}
            className={`ml-4 space-y-2 p-3 rounded-lg border-2 border-dashed ${
              isOverPergunta ? 'border-accent bg-accent/5' : 'border-border'
            }`}
          >
            {pergunta.alternativas.length === 0 ? (
              <div className="text-center py-2 text-muted-foreground text-xs">
                Arraste alternativas aqui
              </div>
            ) : (
              pergunta.alternativas.map((alternativa) => (
                <div key={alternativa.id_alternativa} className="flex items-center justify-between gap-2 p-2 bg-background rounded">
                  <AlternativaCard alternativa={alternativa} showStatus={false} />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveAlternativa(grupoId, pergunta.id_pergunta, alternativa.id_alternativa)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 h-6 w-6"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
