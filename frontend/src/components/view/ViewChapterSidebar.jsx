import React from "react";
import { BookOpen, ChevronLeft } from "lucide-react";

const ViewChapterSidebar = ({
  book,
  selectedChapterIndex,
  onSelectChapter,
  isOpen,
  onClose,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white flex flex-col border-r border-slate-200 shadow-xl lg:shadow-none transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 shrink-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-violet-700" />
            <h2 className="font-bold text-lg text-slate-900 tracking-tight">
              Chapters
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 rounded-lg lg:hidden transition-colors"
            aria-label="Close sidebar"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Chapters List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {book?.chapters?.map((chapter, index) => {
            const isSelected = selectedChapterIndex === index;

            return (
              <button
                key={chapter._id || index}
                onClick={() => {
                  onSelectChapter(index);
                  // Optional: Auto-close sidebar on mobile after selecting a chapter
                  if (window.innerWidth < 1024) onClose();
                }}
                className={`w-full text-left p-4 border-b border-slate-50 transition-colors duration-200 ${
                  isSelected
                    ? "bg-violet-50/80 border-l-4 border-l-violet-600"
                    : "bg-white hover:bg-slate-50 border-l-4 border-l-transparent"
                }`}
              >
                <h3
                  className={`font-semibold text-sm truncate mb-1 ${
                    isSelected ? "text-violet-900" : "text-slate-800"
                  }`}
                  title={chapter.title}
                >
                  {chapter.title || `Chapter ${index + 1}`}
                </h3>
                <p
                  className={`text-xs font-medium ${
                    isSelected ? "text-violet-600/80" : "text-slate-500"
                  }`}
                >
                  Chapter {index + 1}
                </p>
              </button>
            );
          })}

          {/* Empty State fallback */}
          {(!book?.chapters || book.chapters.length === 0) && (
            <div className="p-6 text-center text-sm text-slate-500 italic">
              No chapters available.
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default ViewChapterSidebar;
