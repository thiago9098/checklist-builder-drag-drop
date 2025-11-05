import { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { DraggableCard } from '@/components/checklist/DraggableCard';
import { DroppableZone } from '@/components/checklist/DroppableZone';
import { PerguntaCard } from '@/components/checklist/PerguntaCard';
import { AlternativaCard } from '@/components/checklist/AlternativaCard';
import { mockPerguntas, mockAlternativas } from '@/data/mockData';
import { ChecklistItem, Pergunta, Alternativa } from '@/types/checklist';
import { Plus, Save, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || over.id !== 'checklist-zone') return;

    const [type, id] = (active.id as string).split('-');
    
    // Check if item already exists
    const exists = checklistItems.some(item => item.id === active.id);
    if (exists) {
      toast.error('Este item já foi adicionado ao checklist');
      return;
    }

    let newItem: ChecklistItem | null = null;

    if (type === 'pergunta') {
      const pergunta = mockPerguntas.find(p => p.id_pergunta === parseInt(id));
      if (pergunta) {
        newItem = {
          id: active.id as string,
          type: 'pergunta',
          data: pergunta,
          order: checklistItems.length
        };
      }
    } else if (type === 'alternativa') {
      const alternativa = mockAlternativas.find(a => a.id_alternativa === parseInt(id));
      if (alternativa) {
        newItem = {
          id: active.id as string,
          type: 'alternativa',
          data: alternativa,
          order: checklistItems.length
        };
      }
    }

    if (newItem) {
      setChecklistItems([...checklistItems, newItem]);
      toast.success('Item adicionado ao checklist');
    }
  };

  const removeItem = (id: string) => {
    setChecklistItems(checklistItems.filter(item => item.id !== id));
    toast.success('Item removido do checklist');
  };

  const saveChecklist = () => {
    console.log('Checklist salvo:', checklistItems);
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
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-2">Seu Checklist</h2>
                  <p className="text-sm text-muted-foreground">
                    {checklistItems.length} {checklistItems.length === 1 ? 'item adicionado' : 'itens adicionados'}
                  </p>
                </div>
                
                <Separator className="mb-6" />

                <DroppableZone id="checklist-zone">
                  {checklistItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Plus className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Checklist vazio</h3>
                      <p className="text-sm text-muted-foreground max-w-sm">
                        Arraste perguntas e alternativas da barra lateral para começar a criar seu checklist
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {checklistItems.map((item, index) => (
                        <Card key={item.id} className="p-4 bg-background border-2">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              {item.type === 'pergunta' ? (
                                <PerguntaCard pergunta={item.data as Pergunta} />
                              ) : (
                                <AlternativaCard alternativa={item.data as Alternativa} />
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.id)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </DroppableZone>
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
