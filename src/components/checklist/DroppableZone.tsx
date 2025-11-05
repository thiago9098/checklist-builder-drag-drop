import { useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';

interface DroppableZoneProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export const DroppableZone = ({ id, children, className }: DroppableZoneProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "min-h-[400px] p-6 rounded-lg border-2 border-dashed transition-all",
        isOver ? "border-primary bg-primary/5" : "border-border bg-card",
        className
      )}
    >
      {children}
    </div>
  );
};
