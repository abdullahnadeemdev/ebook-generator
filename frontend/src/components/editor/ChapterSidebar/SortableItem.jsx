import { ArrowLeft, Sparkles, Trash2, Plus, GripVertical } from "lucide-react";

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

export default SortableItem;
