import { Button } from '@/components/ui/button';
import useEditLike from '@/hooks/use-EditLike';
import { useEffect, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProps,
  DropResult,
} from 'react-beautiful-dnd';

const LikePage = () => {
  const { data, isEdit, reorder, save } = useEditLike();

  console.log(data);

  const handleDragEndDrop = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const from = result.source.index;
    const to = result.destination.index;

    reorder(from, to);
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEndDrop}>
        <StricModeDroppable droppableId="likes">
          {droppableProps => (
            <ul
              ref={droppableProps.innerRef}
              {...droppableProps.droppableProps}
            >
              {data &&
                data.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {droppableProps => (
                      <li
                        ref={droppableProps.innerRef}
                        {...droppableProps.draggableProps}
                        {...droppableProps.dragHandleProps}
                      >
                        <div className="bg-red-500 p-4">
                          {item.order} {item.hotelName}
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
              {droppableProps.placeholder}
            </ul>
          )}
        </StricModeDroppable>
      </DragDropContext>
      {isEdit && (
        <div className="fixed bottom-0 left-0 w-full p-4">
          <Button className="w-full" onClick={save}>
            순서 저장하기
          </Button>
        </div>
      )}
    </div>
  );
};

const StricModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => {
      setEnabled(true);
    });

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
};

export default LikePage;
