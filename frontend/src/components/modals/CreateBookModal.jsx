import { useState, useRef, useEffect } from "react";
import {
  Plus,
  Sparkles,
  Trash2,
  ArrowLeft,
  BookOpen,
  Hash,
  Lightbulb,
  Palette,
} from "lucide-react";
import Modal from "../shared/Modal";
import InputField from "../shared/InputField";
import SelectedField from "../shared/SelectedField";
import Button from "../shared/Button";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const CreateBookModal = ({ isOpen, onClose, onBookCreated }) => {
  const { user } = useAuth();

  const [step, setStep] = useState(1);
  const [bookTitle, setBookTitle] = useState("");
  const [numChapters, setNumChapters] = useState(5);
  const [aiTopic, setAiTopic] = useState("");
  const [aiStyle, setAiStyle] = useState("Informative");
  const [chapters, setChapters] = useState([]);
  const [isGeneratingOutline, setIsGeneratingOutline] = useState(false);
  const [isFinalizingBook, setIsFinalizingBook] = useState(false);
  const chaptersContainRef = useRef(null);

  const resetModal = () => {
    setStep(1);
    setBookTitle("");
    setNumChapters(5);
    setAiTopic("");
    setAiStyle("Informative");
    setChapters([]);
    setIsFinalizingBook(false);
    setIsGeneratingOutline(false);
  };

  const handleGenerateOutline = async () => {
    if (!bookTitle || !numChapters) {
      toast.error("Please provide a bok title and number of chapters");
      return;
    }

    setIsGeneratingOutline(true);
    try {
      const response = await axiosInstance.post(API_PATHS.AI.GENERATE_OUTLINE, {
        topic: bookTitle,
        description: aiTopic || "",
        style: aiStyle,
        numChapters: numChapters,
      });

      setChapters(response.data.outline);
      setStep(2);
      toast.success("Outline is generated.");
    } catch (error) {
      toast.error(
        "error in generating outline",
        error?.response?.data?.message,
      );
    } finally {
      setIsGeneratingOutline(fasle);
    }
  };

  const handleChapterChange = (index, field, value) => {
    const updatedChapters = [...chapters];
    updatedChapters[index][field] = value;
    setChapters(updatedChapters);
  };

  const handleDeleteChapter = (index) => {
    if (chapters.length <= 1) return;
    setChapters(chapters.filter((_, i) => i !== index));
  };

  const handleAddChapter = () => {
    setChapters([
      ...chapters,
      { title: `Chapter ${chapters.length + 1}`, description: "" },
    ]);
  };

  const handleFinalizeBook = async () => {
    if (!bookTitle || chapters.length === 0) {
      toast.error("Book title and at least one chapter are required");
      return;
    }

    setIsFinalizingBook(true);
    try {
      const response = await axiosInstance.post(API_PATHS.BOOKS.CREATE_BOOK, {
        title: bookTitle,
        author: user.name || "Unknown Author",
        chapters: chapters,
      });

      toast.success("Book created successfully");
      onBookCreated(response.data._id);
      onClose();
      resetModal();
    } catch (error) {
      console.log("Test", bookTitle, chapters);
      toast.error("failed to create a book", error?.response?.data?.message);
    } finally {
      setIsFinalizingBook(false);
    }
  };

  useEffect(() => {
    if (step === 2 && chaptersContainRef.current) {
      const scrollableDiv = chaptersContainRef.current;
      scrollableDiv.scrollTo({
        top: scrollableDiv.scrollHeight,
        behaviour: "smooth",
      });
    }
  }, [chapters.length, step]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        resetModal();
      }}
      title="Create New eBook"
    >
      {step === 1 && (
        <div className="space-y-6">
          {/* Stepper Progress Indicator */}
          <div className="flex items-center justify-center mb-8 relative">
            <div className="flex items-center space-x-4 z-10">
              {/* Step 1 Circle (Active) */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold shadow-lg shadow-violet-200">
                  1
                </div>
                <span className="text-[11px] font-bold text-violet-600 mt-2 uppercase tracking-wider">
                  Details
                </span>
              </div>

              {/* Progress Line */}
              <div className="w-16 h-0.5 bg-gray-200 -mt-6"></div>

              {/* Step 2 Circle (Inactive) */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-bold">
                  2
                </div>
                <span className="text-[11px] font-bold text-gray-400 mt-2 uppercase tracking-wider">
                  Outline
                </span>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 gap-5">
            <InputField
              icon={BookOpen}
              label="Book Title"
              placeholder="e.g. The Future of AI in Medicine"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              className="transition-all focus-within:ring-2 focus-within:ring-violet-500/20"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <InputField
                icon={Hash}
                label="Number of Chapters"
                placeholder="5"
                type="number"
                value={numChapters}
                onChange={(e) => setNumChapters(e.target.value || 1)}
                min="1"
                max="20"
              />

              <SelectedField
                icon={Palette}
                label="Writing Style"
                value={aiStyle}
                onChange={(e) => setAiStyle(e.target.value)}
                options={[
                  "Informative",
                  "Storytelling",
                  "Casual",
                  "Professional",
                  "Humorous",
                ]}
              />
            </div>

            <InputField
              icon={Lightbulb}
              label="Detailed Topic (optional)"
              placeholder="Explain specific focus areas for the AI..."
              value={aiTopic}
              onChange={(e) => setAiTopic(e.target.value)}
            />
          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t border-gray-50">
            <Button
              onClick={handleGenerateOutline}
              isLoading={isGeneratingOutline}
              icon={Sparkles}
              className="w-full py-3 bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg shadow-violet-200 transition-all active:scale-[0.98]"
            >
              Generate Outline with AI
            </Button>
            <p className="text-center text-[11px] text-gray-400 mt-3 italic">
              AI generation typically takes 5-10 seconds
            </p>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col max-h-[80vh]">
          {/* 1. Progress Indication */}
          <div className="flex items-center justify-center mb-8 relative">
            <div className="flex items-center space-x-4 z-10">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold border-2 border-green-500">
                  ✓
                </div>
                <span className="text-[10px] font-bold text-green-600 mt-2 uppercase tracking-wider">
                  Details
                </span>
              </div>

              <div className="w-16 h-0.5 bg-green-500 -mt-6"></div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold shadow-lg shadow-violet-200">
                  2
                </div>
                <span className="text-[10px] font-bold text-violet-600 mt-2 uppercase tracking-wider">
                  Outline
                </span>
              </div>
            </div>
          </div>

          {/* 2. Header Info */}
          <div className="flex items-end justify-between mb-4 px-1">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Review Chapters
              </h3>
              <p className="text-sm text-slate-500">
                Adjust the AI-generated outline before finalizing.
              </p>
            </div>
            <span className="bg-violet-50 text-violet-600 text-xs font-bold px-3 py-1 rounded-full border border-violet-100">
              {chapters.length} Chapters
            </span>
          </div>

          {/* 3. Scrollable Chapters List */}
          <div
            ref={chaptersContainRef}
            className="flex-1 overflow-y-auto pr-2 space-y-2 min-h-55 custom-scrollbar"
          >
            {chapters.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <BookOpen className="w-10 h-10 text-slate-300 mb-3" />
                <p className="text-slate-500 font-medium">
                  No chapters available.
                </p>
              </div>
            ) : (
              chapters.map((chapter, index) => (
                <div
                  key={index}
                  className="group relative bg-white border border-slate-200 rounded-2xl p-4 hover:border-violet-300 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    {/* Chapter Number Badge */}
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-sm group-hover:bg-violet-600 group-hover:text-white transition-colors">
                      {index + 1}
                    </div>

                    <div className="flex-1 space-y-3">
                      {/* Title Input */}
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={chapter.title}
                          onChange={(e) =>
                            handleChapterChange(index, "title", e.target.value)
                          }
                          placeholder="Chapter Title"
                          className="w-full font-bold text-slate-800 border-none p-0 focus:ring-0 placeholder:text-slate-300 text-base"
                        />

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteChapter(index)}
                          className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete Chapter"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      {/* Description Textarea */}
                      <textarea
                        value={chapter.description}
                        onChange={(e) =>
                          handleChapterChange(
                            index,
                            "description",
                            e.target.value,
                          )
                        }
                        placeholder="What will this chapter cover?"
                        rows={2}
                        className="w-full text-sm text-slate-600 bg-slate-50 border-none rounded-xl p-3 focus:ring-1 focus:ring-violet-200 placeholder:text-slate-400 resize-none"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 4. Footer Actions */}
          <div className=" pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
            <Button
              variant="ghost"
              onClick={() => setStep(1)}
              icon={ArrowLeft}
              className="text-slate-500 hover:text-slate-800"
            >
              Back
            </Button>

            <div className="flex items-center gap-3">
              <Button
                icon={Plus}
                variant="secondary"
                onClick={handleAddChapter}
                className="border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                Add Chapter
              </Button>

              <Button
                onClick={handleFinalizeBook}
                isLoading={isFinalizingBook}
                className="bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-200"
              >
                Create eBook
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CreateBookModal;
