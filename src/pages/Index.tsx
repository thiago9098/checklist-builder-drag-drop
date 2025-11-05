import { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { DraggableCard } from '@/components/checklist/DraggableCard';
import { PerguntaCard } from '@/components/checklist/PerguntaCard';
import { AlternativaCard } from '@/components/checklist/AlternativaCard';
import { GrupoCard } from '@/components/checklist/GrupoCard';
import { mockPerguntas, mockAlternativas, mockChecklists } from '@/data/mockData';
import { GrupoPergunta, Pergunta, Alternativa, ChecklistCompleto } from '@/types/checklist';
import { Plus, Save, FolderPlus } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [grupos, setGrupos] = useState<GrupoPergunta[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [nextGrupoId, setNextGrupoId] = useState(1);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const [sourceType, sourceId] = (active.id as string).split('-');
    const overData = over.data?.current;

    // Drag pergunta para grupo
    if (sourceType === 'pergunta' && overData?.type === 'grupo') {
      const perguntaId = parseInt(sourceId);
      const pergunta = mockPerguntas.find(p => p.id_pergunta === perguntaId);
      
      if (!pergunta) return;

      const grupoId = overData.grupoId;
      setGrupos(grupos.map(g => {
        if (g.id_grupo_pergunta === grupoId) {
          // Check if pergunta already exists in any grupo
          const existsInGrupo = grupos.some(grupo => 
            grupo.perguntas.some(p => p.id_pergunta === perguntaId)
          );
          
          if (existsInGrupo) {
            toast.error('Esta pergunta já foi adicionada');
            return g;
          }

          return {
            ...g,
            perguntas: [...g.perguntas, { 
              ...pergunta, 
              alternativas: [], 
              nm_ordem: g.perguntas.length + 1 
            }]
          };
        }
        return g;
      }));
      toast.success('Pergunta adicionada ao grupo');
    }

    // Drag alternativa para pergunta
    if (sourceType === 'alternativa' && overData?.type === 'pergunta') {
      const alternativaId = parseInt(sourceId);
      const alternativa = mockAlternativas.find(a => a.id_alternativa === alternativaId);
      
      if (!alternativa) return;

      const { grupoId, perguntaId } = overData;
      
      setGrupos(grupos.map(g => {
        if (g.id_grupo_pergunta === grupoId) {
          return {
            ...g,
            perguntas: g.perguntas.map(p => {
              if (p.id_pergunta === perguntaId) {
                // Check if alternativa already exists
                if (p.alternativas.some(a => a.id_alternativa === alternativaId)) {
                  toast.error('Esta alternativa já foi adicionada');
                  return p;
                }
                
                return {
                  ...p,
                  alternativas: [...p.alternativas, alternativa]
                };
              }
              return p;
            })
          };
        }
        return g;
      }));
      toast.success('Alternativa adicionada à pergunta');
    }
  };

  const addGrupo = () => {
    const novoGrupo: GrupoPergunta = {
      id_grupo_pergunta: nextGrupoId,
      nm_nome: `Grupo ${nextGrupoId}`,
      nm_ordem: grupos.length + 1,
      perguntas: []
    };
    setGrupos([...grupos, novoGrupo]);
    setNextGrupoId(nextGrupoId + 1);
    toast.success('Grupo adicionado');
  };

  const removeGrupo = (id: number) => {
    setGrupos(grupos.filter(g => g.id_grupo_pergunta !== id));
    toast.success('Grupo removido');
  };

  const updateGrupoNome = (id: number, nome: string) => {
    setGrupos(grupos.map(g => g.id_grupo_pergunta === id ? { ...g, nm_nome: nome } : g));
  };

  const removePergunta = (grupoId: number, perguntaId: number) => {
    setGrupos(grupos.map(g => {
      if (g.id_grupo_pergunta === grupoId) {
        return {
          ...g,
          perguntas: g.perguntas.filter(p => p.id_pergunta !== perguntaId)
        };
      }
      return g;
    }));
    toast.success('Pergunta removida');
  };

  const removeAlternativa = (grupoId: number, perguntaId: number, alternativaId: number) => {
    setGrupos(grupos.map(g => {
      if (g.id_grupo_pergunta === grupoId) {
        return {
          ...g,
          perguntas: g.perguntas.map(p => {
            if (p.id_pergunta === perguntaId) {
              return {
                ...p,
                alternativas: p.alternativas.filter(a => a.id_alternativa !== alternativaId)
              };
            }
            return p;
          })
        };
      }
      return g;
    }));
    toast.success('Alternativa removida');
  };

  const saveChecklist = () => {
    const resultado: ChecklistCompleto = {
      checklist: mockChecklists[0],
      grupo_perguntas: grupos
    };
    
    console.log('Checklist salvo:', JSON.stringify(resultado, null, 2));
    toast.success('Checklist salvo com sucesso!');
  };

  const getActiveItem = () => {
    if (!activeId) return null;
    const [type, id] = activeId.split('-');
    
    if (type === 'pergunta') {
      const pergunta = mockPerguntas.find(p => p.id_pergunta === parseInt(id));
      return pergunta ? <PerguntaCard pergunta={pergunta} showBadges={false} /> : null;
    } else if (type === 'alternativa') {
      const alternativa = mockAlternativas.find(a => a.id_alternativa === parseInt(id));
      return alternativa ? <AlternativaCard alternativa={alternativa} showStatus={false} /> : null;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Construtor de Checklist</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Arraste e solte perguntas e alternativas para criar seu checklist
              </p>
            </div>
            <Button onClick={saveChecklist} size="lg" className="gap-2">
              <Save className="w-4 h-4" />
              Salvar Checklist
            </Button>
          </div>
        </div>
      </header>

      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sidebar com itens disponíveis */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Plus className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold">Perguntas Disponíveis</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Arraste as perguntas para o checklist
                </p>
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {mockPerguntas.map((pergunta) => (
                    <DraggableCard
                      key={`pergunta-${pergunta.id_pergunta}`}
                      id={`pergunta-${pergunta.id_pergunta}`}
                      className="bg-card hover:bg-secondary/50"
                    >
                      <PerguntaCard pergunta={pergunta} />
                    </DraggableCard>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Plus className="w-5 h-5 text-accent" />
                  <h2 className="text-lg font-semibold">Alternativas Disponíveis</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Arraste as alternativas para o checklist
                </p>
                <div className="space-y-3">
                  {mockAlternativas.map((alternativa) => (
                    <DraggableCard
                      key={`alternativa-${alternativa.id_alternativa}`}
                      id={`alternativa-${alternativa.id_alternativa}`}
                      className="bg-card hover:bg-accent/5"
                    >
                      <AlternativaCard alternativa={alternativa} />
                    </DraggableCard>
                  ))}
                </div>
              </Card>
            </div>

            {/* Área principal do checklist */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold mb-2">Seu Checklist</h2>
                    <p className="text-sm text-muted-foreground">
                      {grupos.length} {grupos.length === 1 ? 'grupo criado' : 'grupos criados'}
                    </p>
                  </div>
                  <Button onClick={addGrupo} className="gap-2">
                    <FolderPlus className="w-4 h-4" />
                    Adicionar Grupo
                  </Button>
                </div>
                
                <Separator className="mb-6" />

                {grupos.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <FolderPlus className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Nenhum grupo criado</h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Clique em "Adicionar Grupo" para começar a criar seu checklist
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {grupos.map((grupo, index) => (
                      <GrupoCard
                        key={grupo.id_grupo_pergunta}
                        grupo={grupo}
                        index={index}
                        onRemove={removeGrupo}
                        onUpdateNome={updateGrupoNome}
                        onRemovePergunta={removePergunta}
                        onRemoveAlternativa={removeAlternativa}
                      />
                    ))}
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>

        <DragOverlay>
          {activeId ? (
            <Card className="p-4 shadow-2xl border-2 border-primary opacity-90">
              <div className="flex items-start gap-3">
                <div className="flex-1">{getActiveItem()}</div>
              </div>
            </Card>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Index;
