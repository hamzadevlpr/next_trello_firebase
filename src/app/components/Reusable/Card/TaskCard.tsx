import { useState, useRef } from "react";
import { Id, Task } from "@/app/types/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CheckIcon from "@/app/Icons/CheckIcon";
import CancelIcon from "@/app/Icons/CancelIcon";
import EditIcon from "@/app/Icons/EditIcon";
import TrashIcon from "@/app/Icons/TrashIcon";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

function TaskCard({ task, deleteTask, updateTask }: Props) {
  const [editMode, setEditMode] = useState(false);
  const [taskContent, setTaskContent] = useState(task.content); // Store task content in state
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode, // Disable drag when in edit mode
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleEditClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[title="Edit Task"]')) {
      setEditMode(true);
      setTimeout(() => inputRef.current?.focus(), 0); // Focus the input after rendering
    }
  };

  const handleCancelEditClick = () => {
    setEditMode(false);
    setTaskContent(task.content); // Reset to original task content
  };

  const handleSaveEditClick = () => {
    if (taskContent.trim() !== "") {
      setEditMode(false);
      updateTask(task.id, taskContent); // Save the updated task content
    } else {
      console.log("Task content cannot be empty");
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${isDragging ? "opacity-30 glass-effect" : "bg-gray-200"
        } p-2.5 h-[50px] min-h-[50px] items-center flex justify-between text-left rounded-xl cursor-grab relative task`}
    >
      {editMode ? (
        <input
          ref={inputRef}
          type="text"
          data-id="taskLabel"
          className="w-52 rounded-md my-1 py-1 px-2 text-gray-900 border-0 outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6 text-left ring-1 ring-inset ring-gray-700"
          value={taskContent}
          onChange={(e) => setTaskContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSaveEditClick(); 
            }
          }}
          onBlur={handleSaveEditClick} 
          autoFocus
        />
      ) : (
        <span
          className="w-52 rounded-md my-1 py-1 px-2 text-gray-900 border-0 outline-none sm:text-sm sm:leading-6 text-left cursor-pointer"
          onClick={handleEditClick}
        >
          {task.content}
        </span>
      )}
      <div className="flex justify-center items-center gap-2">
        {editMode ? (
          <>
            <button
              title="SaveTask"
              onClick={(e) => {
                e.stopPropagation();
                handleSaveEditClick();
              }}
            >
              <CheckIcon />
            </button>
            <button
              title="Cancel Task"
              onClick={(e) => {
                e.stopPropagation();
                handleCancelEditClick();
              }}
            >
              <CancelIcon />
            </button>
          </>
        ) : (
          <>
            <button title="Edit Task" onClick={handleEditClick}>
              <EditIcon />
            </button>
            <button
              title="DeleteTask"
              onClick={() => deleteTask(task.id)}
            >
              <TrashIcon />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskCard;
