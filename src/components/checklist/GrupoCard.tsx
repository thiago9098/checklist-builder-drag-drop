import { GrupoPergunta } from '@/types/checklist';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PerguntaDroppableCard } from './PerguntaDroppableCard';
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';

interface GrupoCardProps {
  grupo: GrupoPergunta;
  index: number;
  onRemove: (id: number) => void;
  onUpdateNome: (id: number, nome: string) => void;
  onRemovePergunta: (grupoId: number, perguntaId: number) => void;
  onRemoveAlternativa: (grupoId: number, perguntaId: number, alternativaId: number) => void;
}

export const GrupoCard = ({
  grupo,
  index,
  onRemove,
  onUpdateNome,
  onRemovePergunta,
  onRemoveAlternativa
}: GrupoCardProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { setNodeRef: setGrupoRef, isOver: isOverGrupo } = useDroppable({
    id: `grupo-${grupo.id_grupo_pergunta}`,
    data: { type: 'grupo', grupoId: grupo.id_grupo_pergunta }
  });

  return (
    <Card className={`p-6 ${isOverGrupo ? 'ring-2 ring-primary' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
            {index + 1}
          </div>
          <Input
            value={grupo.nm_nome}
            onChange={(e) => onUpdateNome(grupo.id_grupo_pergunta, e.target.value)}
            placeholder="Nome do grupo"
            className="font-semibold"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(grupo.id_grupo_pergunta)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div ref={setGrupoRef} className="space-y-4 mt-4">
          {grupo.perguntas.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm border-2 border-dashed rounded-lg">
              Arraste perguntas aqui
            </div>
          ) : (
            grupo.perguntas.map((pergunta, pIndex) => (
              <PerguntaDroppableCard
                key={pergunta.id_pergunta}
                pergunta={pergunta}
                pIndex={pIndex}
                grupoId={grupo.id_grupo_pergunta}
                onRemovePergunta={onRemovePergunta}
                onRemoveAlternativa={onRemoveAlternativa}
              />
            ))
          )}
        </div>
      )}
    </Card>
  );
};
