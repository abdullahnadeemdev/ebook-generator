import { useState, useEffect, useReducer, useRef } from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import {
  Sparkles,
  FileDown,
  Save,
  Menu,
  X,
  Edit,
  NotebookText,
  ChevronDown,
  FileText,
} from "lucide-react";
import { arrayMove } from "@dnd-kit/sortable";

import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Dropdown, { DropdownItem } from "../../components/shared/Dropdown";
import InputField from "../../components/shared/InputField";
import Button from "../../components/shared/Button";
import Modal from "../../components/shared/Modal";
import SelectedField from "../../components/shared/SelectedField";
import ChapterSidebar from "../../components/editor/ChapterSidebar";
import BookDetailsTab from "../../components/editor/BookDetailsTab";
import ChapterEditorTab from "../../components/editor/ChapterEditorTab";

const index = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("editor");
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const fileInputRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  //ai modal state
  const [isOutlineModalOpen, setIsOutlineModalOpen] = useState(false);
  const [aiTopic, setAiTopic] = useState("");
  const [aiStyle, setAiStyle] = useState("Informative");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axiosInstance.get(
          `${API_PATHS.BOOKS.GET_BOOK_BY_ID}/${bookId}`,
        );
        setBook(response.data);
      } catch (error) {
        toast.error("Faild to load book details");
        navigate("/dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [bookId, navigate]);

  console.log("book", book);

  const handleBookChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleChapterChange = (e) => {
    const { name, value } = e.trigger;
    const updatedChapters = [...book.chapters];
    updatedChapters[selectedChapterIndex][name] = value;
    setBook((prev) => ({ ...prev, chapters: updatedChapters }));
  };

  const handleAddChapter = () => {
    const newChapter = {
      title: `Chapter ${book.chapters.length + 1}`,
      content: "",
    };

    const updatedChapters = [...book.chapters, newChapter];
    setBook((prev) => ({ ...prev, chapters: updatedChapters }));
    setSelectedChapterIndex(updatedChapters.length - 1);
  };

  const handleDeleteChapter = (index) => {
    if (book.chapters.length <= 1) {
      toast.error("A book must have atleast 1 chapter");
      return;
    }

    const updatedChapters = book.chapters.filter((_, i) => i !== index);
    setBook((prev) => ({ ...prev, chapters: updatedChapters }));
    setSelectedChapterIndex((prevIndex) => {
      prevIndex >= index ? Math.max(0, prevIndex - 1) : prevIndex;
    });
  };

  const handleReorderChapter = (oldIndex, newIndex) => {
    setBook((prev) => ({
      ...prev,
      chapters: arrayMove(prev.chapters, oldIndex, newIndex),
    }));
    setSelectedChapterIndex(newIndex);
  };

  const handleSaveChanges = async (bookToSave = book, showToast = true) => {
    setIsSaving(true);
    try {
      const response = await axiosInstance.put(
        `${API_PATHS.BOOKS.UPDATE_BOOK}/${bookId}`,
        bookToSave,
      );
      if (showToast) {
        toast.success("Changes saved successsfully");
      }
    } catch (error) {
      console.error("ERROR OCCURED", error);
      toast.error("Failed to save changes", error?.response?.data?.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCoverImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("coverImage", file);
    setIsUploading(true);

    try {
      const response = await axiosInstance.put(
        `${API_PATHS.BOOKS.UPDATE_COVER}/${bookId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );
      setBook(response.data);
      toast.success("Cover image uploaded ");
    } catch (error) {
      toast.error("Failed to upload cover image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleGenerateChapterContent = async (index) => {
    const chapter = book.chapters[index];
    if (!chapter || !chapter.title) {
      toast.error("CHpater title is required to generate a chapter");
      return;
    }

    setIsGenerating(true);

    try {
      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_CHAPTER_CONTENT,
        {
          chapterTitle: chapter.title,
          chapterDescription: chapter.description || "",
          style: aiStyle,
        },
      );

      const updatedChapters = [...book.chapters];
      updatedChapters[index].content = response.data.content;

      const updatedBook = { ...book, chapters: updatedChapters };
      setBook(updatedBook);
      toast.success("Content for chapter generated");

      await handleSaveChanges(updatedBook, false);
    } catch (error) {
      toast.error(
        "Error generating chapter content",
        error?.response?.data?.message,
      );
      console.log(error?.response?.data);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportDoc = async () => {
    toast.loading("Generating document...");
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPORT.DOC}/${bookId}/doc`,
        { responseType: "blob" },
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("downlaod", `${book.title}.docx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.dismiss();
      toast.success("Document export started");
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to export document ");
    }
  };

  const handleExportPDF = async () => {
    toast.loading("Generating PDF...");
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPORT.PDF}/${bookId}/pdf`,
        { responseType: "blob" },
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("downlaod", `${book.title}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.dismiss();
      toast.success("PDF export started");
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to export pdf ");
    }
  };

  if (isLoading || !book) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading Editor...</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-screen w-full overflow-hidden bg-slate-50">
        {/* MOBILE SIDEBAR */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z- flex lg:hidden" // ✅ Fixed missing z-
            role="dialog"
            aria-modal="true"
          >
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
              aria-hidden="true"
              onClick={() => setIsSidebarOpen(false)}
            ></div>

            {/* Sidebar Panel */}
            <div className="relative mr-16 flex w-full max-w-xs flex-1 flex-col bg-white shadow-2xl transition-transform duration-300 transform translate-x-0 animate-in slide-in-from-left">
              <div className="absolute top-0 right-0 -mr-12 pt-4">
                <button
                  type="button"
                  className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-white bg-slate-800/50 text-white hover:bg-slate-800"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="h-full flex flex-col overflow-y-auto border-r border-slate-200 bg-white">
                <ChapterSidebar
                  book={book}
                  selectedChapterIndex={selectedChapterIndex}
                  onSelectChapter={(index) => {
                    setSelectedChapterIndex(index);
                    setIsSidebarOpen(false);
                  }}
                  onAddChapter={handleAddChapter}
                  onDeleteChapter={handleDeleteChapter}
                  onGenerateChapterContent={handleGenerateChapterContent}
                  isGenerating={isGenerating}
                  onReorderChapters={handleReorderChapter}
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* DESKTOP SIDEBAR */}
        {/* ========================================== */}
        {isSidebarOpen && (
          <div className="hidden lg:block shrink-0 relative transition-all duration-300">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors z-50"
              title="Close Sidebar"
            >
              <X className="w-5 h-5" />
            </button>

            <ChapterSidebar
              book={book}
              selectedChapterIndex={selectedChapterIndex}
              onSelectChapter={(index) => setSelectedChapterIndex(index)}
              onAddChapter={handleAddChapter}
              onDeleteChapter={handleDeleteChapter}
              onGenerateChapterContent={handleGenerateChapterContent}
              isGenerating={isGenerating}
              onReorderChapters={handleReorderChapter}
            />
          </div>
        )}

        {/* ========================================== */}
        {/* MAIN CONTENT AREA */}
        {/* ========================================== */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Header */}
          <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 shrink-0 z-30">
            <div className="flex items-center gap-4">
              {!isSidebarOpen && (
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-all animate-in fade-in zoom-in"
                >
                  <Menu className="w-6 h-6" />
                </button>
              )}

              {/*  Control Tabs */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl w-fit">
                <button
                  onClick={() => setActiveTab("editor")}
                  className={`flex items-center gap-2 py-1.5 px-4 text-xs font-bold rounded-lg transition-all duration-200 ${
                    activeTab === "editor"
                      ? "bg-white text-violet-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <Edit className="w-4 h-4" />
                  Editor
                </button>

                <button
                  onClick={() => setActiveTab("details")}
                  className={`flex items-center gap-2 py-1.5 px-4 text-xs font-bold rounded-lg transition-all duration-200 whitespace-nowrap ${
                    activeTab === "details"
                      ? "bg-white text-violet-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <NotebookText className="w-4 h-4" />
                  Book Details
                </button>
              </div>
            </div>

            {/* Right Section Actions */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block">
                <Dropdown
                  trigger={
                    <Button
                      variant="secondary"
                      icon={FileDown}
                      className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50 h-10 px-4"
                    >
                      Export
                      <ChevronDown className="w-4 h-4 ml-1 opacity-50" />
                    </Button>
                  }
                >
                  <DropdownItem onClick={handleExportPDF} className="gap-3">
                    <FileText className="w-4 h-4 text-red-500" />
                    Export PDF
                  </DropdownItem>
                  <DropdownItem onClick={handleExportDoc} className="gap-3">
                    <FileText className="w-4 h-4 text-blue-500" />
                    Export DOC
                  </DropdownItem>
                </Dropdown>
              </div>

              <Button
                onClick={() => handleSaveChanges()}
                isLoading={isSaving}
                icon={Save}
                className="bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-100 h-10 px-5"
              >
                Save Changes
              </Button>
            </div>
          </header>

          {/*  Editor Viewport */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 custom-scrollbar">
            <div className="max-w-5xl mx-auto">
              {activeTab === "editor" ? (
                <ChapterEditorTab
                  book={book}
                  selectedChapterIndex={selectedChapterIndex}
                  onChapterChange={handleChapterChange}
                  onGenerateChapterContent={handleGenerateChapterContent}
                  isGenerating={isGenerating}
                />
              ) : (
                <BookDetailsTab
                  book={book}
                  onBookChange={handleBookChange}
                  onCoverUpload={handleCoverImageUpload}
                  isUploading={isUploading}
                  fileInputRef={fileInputRef}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default index;
