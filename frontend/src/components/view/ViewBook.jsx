import { useState } from "react";
import { ChevronLeft, Menu } from "lucide-react";
import ViewChapterSidebar from "./ViewChapterSidebar"; // Make sure the filename matches your import

const ViewBook = ({ book }) => {
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fontSize, setFontSize] = useState(18);

  const selectedChapter = book.chapters[selectedChapterIndex];

  // Format content with proper paragraphs and styling
  const formatContent = (content) => {
    if (!content) return "";
    return content
      .split("\n\n")
      .filter((paragraph) => paragraph.trim())
      .map((paragraph) => paragraph.trim())
      .map((paragraph) => {
        paragraph = paragraph.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        paragraph = paragraph.replace(
          /(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g,
          "<em>$1</em>",
        );
        return `<p class="mb-6 leading-relaxed">${paragraph}</p>`; // Added margin bottom for spacing
      })
      .join("");
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden relative w-full">
      <ViewChapterSidebar
        book={book}
        selectedChapterIndex={selectedChapterIndex}
        onSelectChapter={setSelectedChapterIndex}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-full">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 shrink-0 z-10 shadow-sm">
          {/* Left Side: Menu & Book Info */}
          <div className="flex items-center gap-4 min-w-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 lg:hidden text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              title="Open Table of Contents"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="min-w-0 flex flex-col">
              <h1 className="text-base font-bold text-slate-900 truncate">
                {book.title}
              </h1>
              <p className="text-xs font-medium text-slate-500 truncate">
                by {book.author}
              </p>
            </div>
          </div>

          {/* Right Side: Reading Controls */}
          <div className="flex items-center shrink-0">
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/60">
              <button
                onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                className="px-3 py-1 text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition-all hover:shadow-sm active:scale-95"
                title="Decrease font size"
              >
                A-
              </button>
              <span className="w-8 text-center text-xs font-bold text-slate-400 select-none">
                {fontSize}
              </span>
              <button
                onClick={() => setFontSize(Math.min(28, fontSize + 2))}
                className="px-3 py-1 text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition-all hover:shadow-sm active:scale-95"
                title="Increase font size"
              >
                A+
              </button>
            </div>
          </div>
        </header>

        {/* Reader Viewport */}
        <div className="flex-1 overflow-y-auto custom-scrollbar scroll-smooth">
          <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
            {selectedChapter ? (
              <article className="bg-white p-8 md:p-16 rounded-2xl shadow-sm border border-slate-100">
                {/* Chapter Title */}
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-12 pb-6 border-b border-slate-100">
                  {selectedChapter.title}
                </h2>

                {/* Chapter Content */}
                <div
                  className="text-slate-800 transition-all duration-200 ease-in-out"
                  style={{
                    fontSize: `${fontSize}px`,
                    fontFamily: 'Charter, Georgia, "Times New Roman", serif',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: selectedChapter.content
                      ? formatContent(selectedChapter.content)
                      : '<p class="text-slate-400 italic text-center py-10">This chapter is empty.</p>',
                  }}
                />
              </article>
            ) : (
              <div className="text-center py-20 text-slate-500">
                <p>Select a chapter from the menu to start reading.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewBook;
