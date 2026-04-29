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
import SortableItem from "./SortableItem";

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
    chapter.id || `new-${index + 1}`;
  });
  console.log(chapterIds);

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
