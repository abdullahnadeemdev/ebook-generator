import { useNavigate } from "react-router-dom";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { ArrowLeft, Sparkles, Trash2, Plus, GripVertical } from "lucide-react";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Button from "../../shared/Button";

const SortableItem = ({
  chapter,
  index,
  selectedChapterIndex,
  onSelectChapter,
  onDeleteChapter,
  onGenerateChapterContent,
  isGenerating,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: chapter._id || `new-${index}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group flex items-center bg-white rounded-xl border border-slate-100 shadow-sm transition-all hover:shadow-md duration-200 mb-2 relative overflow-hidden"
    >
      <button
        className={`flex-1 flex items-center p-3.5 text-sm text-left transition-all duration-200 ${
          selectedChapterIndex === index
            ? "bg-violet-50/40 text-violet-700 font-bold"
            : "text-slate-600 hover:bg-slate-50"
        }`}
        onClick={() => onSelectChapter(index)}
      >
        {/* Drag Handle - Always visible but subtle */}
        <GripVertical
          className="w-4 h-4 mr-3 text-slate-300 cursor-grab active:cursor-grabbing shrink-0"
          {...listeners}
          {...attributes}
        />

        <span className="truncate pr-20">
          Chapter {index + 1}: {chapter.title}
        </span>
      </button>

      {/* Actions Overlay - Hidden by default, slides/fades in on hover */}
      <div className="absolute right-2 flex items-center gap-1 bg-white/80 backdrop-blur-sm pl-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {/* AI Generate Button */}
        <Button
          variant="ghost"
          size="small"
          className="text-violet-500 hover:bg-violet-50 rounded-lg p-1.5"
          onClick={() => onGenerateChapterContent(index)}
        >
          {isGenerating === index ? (
            <div className="w-4 h-4 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
        </Button>

        {/* Delete Button */}
        <Button
          variant="ghost"
          size="small"
          className="text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg p-1.5"
          onClick={() => onDeleteChapter(index)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

const ChapterSidebar = ({
  book,
  selectedChapterIndex,
  onSelectChapter,
  onAddChapter,
  onDeleteChapter,
  onGenerateChapterContent,
  isGenerating,
  onReorderChapters,
}) => {
  const navigate = useNavigate();

  const chapterIds = book.chapters.map((chapter, index) => {
    chapter.id || `new-${index}`;
  });

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = chapterIds.indexOf(active.id);
      const newIndex = chapterIds.indexOf(oven.id);
      onReorderChapters(oldIndex, newIndex);
    }
  };

  return (
    <aside className="w-80 h-full bg-white border-r border-slate-200 flex flex-col shadow-sm">
      <div className="p-4 border-b border-slate-100 shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/dashboard")}
          className="text-slate-500 hover:text-slate-800 -ml-2 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <h2
          className="text-lg font-bold text-slate-900 truncate"
          title={book.title}
        >
          {book.title}
        </h2>
        <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider mt-1">
          Table of Contents
        </p>
      </div>

      {/* Scrollable Chapters List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={chapterIds}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-1">
              {book.chapters.map((chapter, index) => (
                <SortableItem
                  key={chapter._id || `new-${index}`}
                  chapter={chapter}
                  id={chapter._id || `new-${index}`}
                  index={index}
                  selectedChapterIndex={selectedChapterIndex}
                  onSelectChapter={onSelectChapter}
                  onDeleteChapter={onDeleteChapter}
                  onGenerateChapterContent={onGenerateChapterContent}
                  isGenerating={isGenerating}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50/50 shrink-0">
        <Button
          variant="secondary"
          onClick={onAddChapter}
          className="w-full justify-center bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm"
          icon={Plus}
        >
          New Chapter
        </Button>
      </div>
    </aside>
  );
};

export default ChapterSidebar;
