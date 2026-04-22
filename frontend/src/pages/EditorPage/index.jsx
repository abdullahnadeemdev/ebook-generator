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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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

  const handleBookChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleChapterChange = (e) => {};

  const handleAddChapter = () => {};

  const handleDeleteChapter = (index) => {};

  const handleReorderChapter = () => {};

  const handleSaveChanges = async (bookToSave = book, showToast = true) => {};

  const handleCoverImageUpload = async (e) => {};

  const handleGenerateChapterContent = async (index) => {};

  const handleExportDoc = () => {};

  const handleExportPDF = () => {};

  if (isLoading || !book) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading Editor...</p>
      </div>
    );
  }

  return (
    <>
      <div>
        {/* mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z- flex lg:hidden"
            role="dialog"
            aria-modal="true"
          >
            <div
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
              aria-hidden="true"
              onClick={() => setIsSidebarOpen(false)}
            ></div>

            <div className="relative mr-16 flex w-full max-w-xs flex-1 flex-col bg-white shadow-2xl transition-transform duration-300 transform translate-x-0 animate-in slide-in-from-left">
              <div className="absolute top-0 right-0 -mr-12 pt-4">
                <button
                  type="button"
                  className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white bg-slate-800/50 text-white hover:bg-slate-800"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="h-full flex flex-col overflow-y-auto border-r border-slate-200">
                <div className="flex-1">
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

            <div className="w-14 shrink-0" aria-hidden="true"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default index;
