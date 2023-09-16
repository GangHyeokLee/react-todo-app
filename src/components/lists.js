import React from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import List from "./list";


const Lists = React.memo(function({ todoData, setTodoData, handleClick}) {
    console.log('lists component'); 

    const handleEnd = (result) => {
        console.log('result', result)
        if(!result.destination) return;

        const newTodoData = todoData;
        // 변경 시키는 아이템을 배열에서 지워줌
        // return 값으로 지워진 아이템을 잡아줌
        const [reorderedItem] = newTodoData.splice(result.source.index, 1);
        // 원하는 자리에 reorderitem을 넣어줌 
        newTodoData.splice(result.destination.index, 0, reorderedItem);

        setTodoData(newTodoData);
    }
    return (
        <DragDropContext onDragEnd={handleEnd}>
            <Droppable droppableId="todo">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {todoData.map((data, index) => (
                            <Draggable
                                key={data.id}
                                draggableId={data.id.toString()}
                                index={index}
                            >
                                {(provided, snapshot) => (
                                    <List 
                                    key={data.id}
                                    id={data.id}
                                    title={data.title}
                                    completed={data.completed}
                                    todoData={todoData}
                                    setTodoData={setTodoData}
                                    provided={provided}
                                    snapshot={snapshot}
                                    handleClick={handleClick} />
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
});

export default Lists