import { SortableContext, useSortable } from "@dnd-kit/sortable";
import TrashIcon from "../../../Icons/TrashIcon";
import { Column, Id, Task } from "@/app/types/types";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import PlusIcon from "../../../Icons/PlusIcon";
import TaskCard from "../Card/TaskCard";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;

  createTask: (columnId: Id) => void;
  updateTask: (id: Id, content: string) => void;
  deleteTask: (id: Id) => void;
  tasks: Task[];
}

function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
  updateTask,
}: Props) {
  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="glass-effect opacity-40 border-2 border-pink-500 w-[300px] h-[400px] max-h-[400px] rounded-md flex flex-col"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="ring-pink-500 hover:ring-2 glass-effect w-[300px] h-[500px] max-h-[400px] rounded-md  flex  flex-col"
    >
      {/* Column title */}
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        className="bg-gray-200 text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold flex items-center justify-between"
      >
        <span className="bg-gray-50 flex justify-center items-center w-5 h-5 rounded-full text-xs">
          {tasks.length}
        </span>
        <div
          className="columns flex gap-2 justify-center items-center" data-title="columnTitle">
          {!editMode && column.title}
          {editMode && (
            <input
              data-columnId="title"
              className="bg-white focus:border-rose-500 border rounded outline-none px-2 w-48"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}
        </div>
        <button
          data-columnId="deleteColumn"
          onClick={() => {
            deleteColumn(column.id);
          }}
          className="stroke-pink-600 rounded px-2 py-2 bg-rose-300"
        >
          <TrashIcon />
        </button>
      </div>

      {/* Column task container */}
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
      {/* Column footer */}
      <button
        className="h-[40px] w-[300px] min-w-[300px] cursor-pointer rounded-b-lg glass-effect p-2 justify-center ring-pink-500 hover:ring-2 flex gap-2"
        onClick={() => {
          createTask(column.id);
        }}
      >
        <PlusIcon />
        Add task
      </button>
    </div>
  );
}

export default ColumnContainer;
