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

  const [step, setStep] = useState(2);
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

  const handleGenerateOutline = async () => {};

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

  const handleFinalizeBook = async () => {};

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
    </Modal>
  );
};

export default CreateBookModal;
