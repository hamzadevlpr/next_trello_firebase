import PlusIcon from "../../../Icons/PlusIcon";
import { ref, set, get } from "firebase/database";
import { db } from "@/app/(auth)/Firebase/firebase";
import { useEffect, useMemo, useState } from "react";
import { Column, Id, Task } from "@/app/types/types";
import ColumnContainer from "../../Reusable/Container/ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "../../Reusable/Card/TaskCard";
import Navbar from "../Navbar/Navbar";
import ClipLoader from "react-spinners/ClipLoader";
import toast from "react-hot-toast";
const defaultCols: Column[] = [];

const defaultTasks: Task[] = [];

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(defaultCols);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [tasks, setTasks] = useState<Task[]>(defaultTasks);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const [loading, setLoading] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  // fetching columns and tasks
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const userId = user.uid;

    const fetchData = async () => {
      try {
        const columnsSnapshot = await get(ref(db, `columns/${userId}`));
        const tasksSnapshot = await get(ref(db, `tasks/${userId}`));

        if (columnsSnapshot.exists()) {
          setColumns(columnsSnapshot.val());
        }

        if (tasksSnapshot.exists()) {
          setTasks(tasksSnapshot.val());
        }

        setLoading(false);
      } catch (error: any) {
        toast.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="glass-effect flex flex-col m-10 rounded-xl">
        <Navbar />

        <div className=" m-3 min-h-[65vh] flex justify-center items-center overflow-x-auto pb-3 flex-col">
          {loading ? (
            <div className="flex h-[45vh] justify-center items-center">
              <ClipLoader size={80} color="#ee2b91" />
            </div>
          ) : (
            <>
              <button
                onClick={() => {
                  createNewColumn();
                }}
                className="justify-center items-center m-3 h-[60px] w-[300px] min-w-[300px] cursor-pointer rounded-lg bg-gray-200 p-4 flex gap-2 ring-pink-500 hover:ring-2"
              >
                <PlusIcon />
                Add Column
              </button>
              <DndContext
                sensors={sensors}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
              >
                <div className="m-auto flex gap-4">
                  <div className="flex gap-4">
                    <SortableContext items={columnsId}>
                      {columns.map((col) => (
                        <ColumnContainer
                          key={col.id}
                          column={col}
                          deleteColumn={deleteColumn}
                          updateColumn={updateColumn}
                          createTask={createTask}
                          deleteTask={deleteTask}
                          updateTask={updateTask}
                          tasks={tasks.filter(
                            (task) => task.columnId === col.id
                          )}
                        />
                      ))}
                    </SortableContext>
                  </div>
                </div>

                {createPortal(
                  <DragOverlay>
                    {activeColumn && (
                      <ColumnContainer
                        column={activeColumn}
                        deleteColumn={deleteColumn}
                        updateColumn={updateColumn}
                        createTask={createTask}
                        deleteTask={deleteTask}
                        updateTask={updateTask}
                        tasks={tasks.filter(
                          (task) => task.columnId === activeColumn.id
                        )}
                      />
                    )}
                    {activeTask && (
                      <TaskCard
                        task={activeTask}
                        deleteTask={deleteTask}
                        updateTask={updateTask}
                      />
                    )}
                  </DragOverlay>,
                  document.body
                )}
              </DndContext>
            </>
          )}
        </div>
      </div>
    </>
  );

  // done
  function createTask(columnId: Id) {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const userId = user.uid;

    const newTask = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };

    const tasksRef = ref(db, `tasks/${userId}`);
    set(tasksRef, [...tasks, newTask]);

    setTasks([...tasks, newTask]);
  }

  // done
  function deleteTask(id: Id) {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const userId = user.uid;

    const newTasks = tasks.filter((task) => task.id !== id);

    const tasksRef = ref(db, `tasks/${userId}`);
    set(tasksRef, newTasks);

    setTasks(newTasks);
  }

  // done
  function updateTask(id: Id, content: string) {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const userId = user.uid;

    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, content } : task
    );

    const tasksRef = ref(db, `tasks/${userId}`);
    set(tasksRef, newTasks);

    setTasks(newTasks);
  }

  // done
  function createNewColumn() {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const userId = user.uid;

    const columnToAdd = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    const columnsRef = ref(db, `columns/${userId}`);
    set(columnsRef, [...columns, columnToAdd]);

    setColumns([...columns, columnToAdd]);
  }
  // done
  function deleteColumn(id: Id) {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const userId = user.uid;

    const filteredColumns = columns.filter((col) => col.id !== id);

    const columnsRef = ref(db, `columns/${userId}`);
    set(columnsRef, filteredColumns);

    const tasksRef = ref(db, `tasks/${userId}`);
    set(
      tasksRef,
      tasks.filter((t) => t.columnId !== id)
    );

    setColumns(filteredColumns);
  }

  // done
  function updateColumn(id: Id, title: string) {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const userId = user.uid;

    const newColumns = columns.map((col) =>
      col.id === id ? { ...col, title } : col
    );

    const columnsRef = ref(db, `columns/${userId}`);
    set(columnsRef, newColumns);

    setColumns(newColumns);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }
  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    const user = JSON.parse(localStorage.getItem("user") || "null");
    const userId = user.uid;
    const columnsRef = ref(db, `columns/${userId}`);

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      const updatedColumns = arrayMove(
        columns,
        activeColumnIndex,
        overColumnIndex
      );
      set(columnsRef, updatedColumns);

      return updatedColumns;
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    const user = JSON.parse(localStorage.getItem("user") || "null");
    const userId = user.uid;
    const tasksRef = ref(db, `tasks/${userId}`);

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
          // Fix introduced after video recording
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          const updatedTasks = arrayMove(tasks, activeIndex, overIndex - 1);
          set(tasksRef, updatedTasks);
          return updatedTasks;
        }

        const updatedTasks = arrayMove(tasks, activeIndex, overIndex);
        set(tasksRef, updatedTasks);
        return updatedTasks;
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;

        const updatedTasks = arrayMove(tasks, activeIndex, activeIndex);
        set(tasksRef, updatedTasks);
        return updatedTasks;
      });
    }
  }
}

function generateId() {
  /* Generate a random number between 0 and 10000 */
  return Math.floor(Math.random() * 10001);
}

export default KanbanBoard;
