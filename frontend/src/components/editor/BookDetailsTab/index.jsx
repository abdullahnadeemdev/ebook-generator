import InputField from "../../shared/InputField";
import Button from "../../shared/Button";
import { UploadCloud } from "lucide-react";
import { BASE_URL } from "../../../utils/apiPaths";

const BookDetailsTab = ({
  book,
  onBookChange,
  onCoverUpload,
  isUploading,
  fileInputRef,
}) => {
  const coverImageURL = book.coverImage?.startsWith("http")
    ? book.coverImage
    : `${BASE_URL}${book.coverImage}`.replace(/\\/g, "/");

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* 1. Basic Information Section */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 bg-violet-600 rounded-full"></div>
          <h3 className="text-lg font-bold text-slate-900">Book Information</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Book Title"
            name="title"
            placeholder="e.g. The Art of Coding"
            value={book.title}
            onChange={onBookChange}
            className="focus:ring-violet-500"
          />
          <InputField
            label="Author Name"
            name="author"
            placeholder="e.g. Abdullah Nadeem"
            value={book.author}
            onChange={onBookChange}
          />
          <div className="md:col-span-2">
            <InputField
              label="Subtitle or Tagline"
              name="subtitle"
              placeholder="A comprehensive guide to modern development..."
              value={book.subtitle || ""}
              onChange={onBookChange}
            />
          </div>
        </div>
      </section>

      {/* 2. Cover Image Section */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 bg-violet-600 rounded-full"></div>
          <h3 className="text-lg font-bold text-slate-900">Cover Design</h3>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Cover Preview Card */}
          <div className="relative group shrink-0">
            <div className="w-48 h-64 rounded-xl overflow-hidden bg-slate-100 border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-[1.02]">
              {book.coverImage ? (
                <img
                  src={coverImageURL}
                  alt="cover preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                  <UploadCloud size={32} className="mb-2 opacity-20" />
                  <span className="text-xs font-medium">No cover selected</span>
                </div>
              )}
            </div>
            {isUploading && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center rounded-xl">
                <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          {/* Upload Controls */}
          <div className="flex-1 space-y-4 py-2">
            <div>
              <h4 className="font-semibold text-slate-800">
                Change Cover Image
              </h4>
              <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                Upload a high-quality JPG or PNG. <br />
                <span className="text-violet-600 font-medium font-mono text-[11px] uppercase tracking-wider">
                  Recommended: 600 x 800px (3:4 ratio)
                </span>
              </p>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={onCoverUpload}
              className="hidden" // ✅ Hidden the default ugly input
              accept="image/*"
            />

            <Button
              variant="secondary"
              onClick={() => fileInputRef.current.click()}
              isLoading={isUploading}
              icon={UploadCloud}
              className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-violet-300 transition-all shadow-sm"
            >
              Select New Image
            </Button>

            <p className="text-[11px] text-slate-400 italic">
              Note: Changes to the cover are saved immediately upon upload.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookDetailsTab;
