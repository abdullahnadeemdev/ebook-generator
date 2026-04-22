import React from "react";
import { useMemo, useState } from "react";
import {
  Sparkle,
  Type,
  Eye,
  Maximize2,
  SpellCheck,
  Sparkles,
} from "lucide-react";
import Button from "../../shared/Button";
import InputField from "../../shared/InputField";
import SimpleMDEditor from "./SimpleMDEditor";

const ChapterEditorTab = ({
  book = {
    title: "Untitled",
    chapters: [{ title: "Chapter 1", content: "-" }],
  },
  selectedChapterIndex = 0,
  onChapterChange = () => {},
  onGenerateChapterContent = () => {},
  isGenerating,
}) => {
  const [isPreview, setIsPreview] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const formatMarkdown = (content) => {
    return (
      content
        // Headers
        .replace(
          /^### (.*$)/gm,
          '<h3 class="text-xl font-bold mb-4 mt-6">$1</h3>',
        )
        .replace(
          /^## (.*$)/gm,
          '<h2 class="text-2xl font-bold mb-4 mt-8">$1</h2>',
        )
        .replace(
          /^# (.*$)/gm,
          '<h1 class="text-3xl font-bold mb-6 mt-8">$1</h1>',
        )

        // Bold and Italic
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')

        // Blockquotes
        .replace(
          /^> (.*$)/gm,
          '<blockquote class="border-l-4 border-violet-500 pl-4 italic">$1</blockquote>',
        )

        // Unordered lists
        .replace(/^- (.*$)/gm, '<li class="ml-4 mb-1">• $1</li>')
        .replace(/(<li.*<\/li>)/gs, '<ul class="my-4">$1</ul>')

        // Ordered lists
        .replace(/^\d+\. (.*$)/gm, '<li class="ml-4 mb-1 list-decimal">$1</li>')
        .replace(
          /(<li class="ml-4 mb-1 list-decimal">.*<\/li>)/gs,
          '<ol class="my-4 ml-4">$1</ol>',
        )

        // Paragraphs
        .split("\n\n")
        .map((paragraph) => {
          paragraph = paragraph.trim();
          if (!paragraph) return "";
          // Skip if already wrapped in HTML tags
          if (paragraph.startsWith("<")) return paragraph;
          return `<p class="mb-4 text-justify">${paragraph}</p>`;
        })
        .join("\n")
    );
  };

  const mdeOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      toolbar: [
        "bold",
        "italic",
        "heading",
        "|",
        "quote",
        "unordered-list",
        "ordered-list",
        "|",
        "link",
        "image",
        "|",
        "preview",
        "side-by-side",
        "fullscreen",
      ],
    };
  }, []);

  if (selectedChapterIndex === null || !book.chapters[selectedChapterIndex]) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div
            className="w-16 h-16 bg-gray-100
          rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Type className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg">
            Select a chapter to start editing
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Choose from the sidebar to begin writing
          </p>
        </div>
      </div>
    );
  }

  const currentChapter = book.chapters[selectedChapterIndex];

  return (
    <div
      className={`${
        isFullscreen
          ? "fixed inset-0 z-50 bg-white rounded-none"
          : "flex-1 bg-white rounded-2xl shadow-sm border border-slate-200"
      } flex flex-col overflow-hidden transition-all duration-200`}
    >
      {/* Header Section */}
      <div className="border-b border-slate-200 px-6 py-4 shrink-0 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Title Area */}
          <div>
            <h1 className="text-xl font-bold text-slate-900">Chapter Editor</h1>
            <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-500 shadow-sm shadow-violet-200"></span>
              Editing:{" "}
              <span className="font-semibold text-slate-700 truncate max-w-50 sm:max-w-xs">
                {currentChapter.title || `Chapter ${selectedChapterIndex + 1}`}
              </span>
            </p>
          </div>

          {/* Editor Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Edit/Preview Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setIsPreview(false)}
                className={`px-4 py-1.5 text-sm font-medium transition-all duration-200 rounded-md ${
                  !isPreview
                    ? "bg-white text-violet-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                }`}
              >
                Edit
              </button>
              <button
                onClick={() => setIsPreview(true)}
                className={`px-4 py-1.5 text-sm font-medium transition-all duration-200 rounded-md ${
                  isPreview
                    ? "bg-white text-violet-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                }`}
              >
                Preview
              </button>
            </div>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors hidden sm:block"
              title="Toggle Fullscreen"
            >
              <Maximize2 className="w-5 h-5" />
            </button>

            {/* AI Generate Button */}
            <Button
              onClick={() => onGenerateChapterContent(selectedChapterIndex)}
              isLoading={isGenerating === selectedChapterIndex}
              icon={Sparkles}
              size="sm"
              className="bg-linear-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white shadow-md border-0"
            >
              Generate with AI
            </Button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-12 bg-slate-50/50 custom-scrollbar">
        <div className="max-w-4xl mx-auto w-full space-y-6">
          {/* Chapter Title Input Box */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-shadow hover:shadow-md">
            <InputField
              label="Chapter Title"
              name="title"
              value={currentChapter.title || ""}
              onChange={onChapterChange}
              placeholder="Enter a captivating chapter title..."
              className="text-lg font-medium text-slate-900"
            />
          </div>

          {/* Text Editor */}
          <div className="flex flex-col flex-1 bg-white border border-slate-200 rounded-xl shadow-sm mt-6 overflow-hidden">
            {/* Editor / Preview Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {isPreview ? (
                <div className="min-h-125 bg-slate-50/30">
                  {/* Preview Mode Banner */}
                  <div className="sticky top-0 bg-violet-50/90 backdrop-blur-sm border-b border-violet-100 px-6 py-2.5 flex items-center justify-center gap-2 text-violet-700 text-sm font-semibold z-10 shadow-sm">
                    <Eye className="w-4 h-4" />
                    <span>Preview Mode</span>
                  </div>

                  {/* Preview Content Document */}
                  <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 my-8 shadow-sm border border-slate-100 rounded-xl">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-8 pb-6 border-b border-slate-100">
                      {currentChapter.title || "Untitled Chapter"}
                    </h1>
                    <div
                      className="text-slate-800"
                      style={{
                        fontFamily:
                          'Charter, Georgia, "Times New Roman", serif',
                        lineHeight: 1.8,
                        fontSize: "1.125rem",
                      }}
                      dangerouslySetInnerHTML={{
                        /* ✅ FIXED: _html changed to __html */
                        __html: currentChapter.content
                          ? formatMarkdown(currentChapter.content)
                          : '<p class="text-slate-400 italic text-center py-10">No content yet. Start writing to see the preview.</p>',
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="h-full ">
                  {/* Note: The long class string above helps style SimpleMDE directly if it's wrapping strangely */}
                  <SimpleMDEditor
                    value={currentChapter.content || ""}
                    onChange={(value) =>
                      /* ✅ FIXED: targe changed to target */
                      onChapterChange({ target: { name: "content", value } })
                    }
                    options={mdeOptions}
                  />
                </div>
              )}
            </div>

            {/* Status Bar (Pinned to bottom) */}
            <div className="bg-slate-50 border-t border-slate-200 px-4 py-2.5 flex items-center justify-between text-[11px] font-medium text-slate-500 uppercase tracking-wider shrink-0">
              <div className="flex items-center gap-6">
                <span>
                  Words:{" "}
                  <span className="text-slate-700 font-bold">
                    {currentChapter.content
                      ? currentChapter.content
                          .trim()
                          .split(/\s+/)
                          .filter((word) => word.length > 0).length
                      : 0}
                  </span>
                </span>
                <span>
                  Characters:{" "}
                  <span className="text-slate-700 font-bold">
                    {currentChapter.content ? currentChapter.content.length : 0}
                  </span>
                </span>
              </div>

              {/* Auto-save Indicator */}
              <div className="flex items-center gap-2 bg-green-100 text-green-700 px-2 py-1 rounded-md">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="normal-case text-xs font-semibold tracking-normal">
                  Auto-saved
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterEditorTab;
