import { useState, useRef, MutableRefObject } from "react";
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
  const [originalContent, setOriginalContent] = useState(task.content);
  const pRef = useRef<HTMLParagraphElement>(null);

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
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleEditClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[title="Edit Task"]')) {
      setEditMode(true);
      setOriginalContent(pRef.current?.textContent || "");
      pRef.current?.focus();
    }
  };


  const handleCancelEditClick = () => {
    setEditMode(false);
    pRef.current && (pRef.current.textContent = originalContent);
  };

  const handleSaveEditClick = () => {
    const newTaskName = pRef.current?.textContent ?? "";
    if (newTaskName !== undefined && newTaskName !== "") {
      setEditMode(false);
      updateTask(task.id, newTaskName);
    } else {
      console.log("Task name cannot be empty");
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={handleEditClick}
      className={`${isDragging
        ? "opacity-30 glass-effect"
        : "bg-gray-200"
        } p-2.5 h-[50px] min-h-[50px] items-center flex justify-between text-left rounded-xl cursor-grab relative task`}
    >
      <p
        ref={pRef}
        className={`${editMode ? "cursor-text" : ""
          } w-52 rounded-md my-1 py-1 px-2 text-gray-900 border-0 outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6 text-left ${editMode ? "ring-1 ring-inset ring-gray-700" : ""
          }`}
        contentEditable={editMode}
        suppressContentEditableWarning={true}
        onClick={handleEditClick}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSaveEditClick();
          }
        }}
      >
        {task.content}
      </p>
      <div className="flex justify-center items-center gap-2">
        {editMode ? (
          <>
            <button
              title="Save Edit"
              onClick={(e) => {
                e.stopPropagation();
                handleSaveEditClick();
              }}
            >
              <CheckIcon />
            </button>
            <button
              title="Cancel Edit"
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
              title="Delete Task"
              data-taskDelete="taskDelete"
              onClick={() => {
                deleteTask(task.id);
              }}
            >
              <TrashIcon />
            </button>
          </>
        )}
      </div>
    </div >
  );
}

export default TaskCard;
