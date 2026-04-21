import React from "react";
import { BASE_URL } from "../../utils/apiPaths";
import { Edit, Trash2, Book as BookIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book, onDelete }) => {
  const navigate = useNavigate();

  const coverImageUrl = book.coverImage
    ? `${BASE_URL}/backend${book.coverImage}`.replace(/\\/g, "/")
    : "";

  return (
    <div
      className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={() => navigate(`/view-book/${book._id}`)}
    >
      <div className="relative aspect-3/4 overflow-hidden bg-slate-100">
        {coverImageUrl ? (
          <img
            src={coverImageUrl}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/300x400?text=No+Cover";
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 bg-slate-50">
            <BookIcon size={48} strokeWidth={1.5} />
          </div>
        )}

        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/editor/${book._id}`);
            }}
            className="p-3 bg-white text-violet-600 rounded-full shadow-lg hover:bg-violet-600 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
            title="Edit eBook"
          >
            <Edit size={20} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(book._id);
            }}
            className="p-3 bg-white text-red-600 rounded-full shadow-lg hover:bg-red-600 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
            title="Delete eBook"
          >
            <Trash2 size={20} />
          </button>
        </div>

        {book.status && (
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur shadow-sm rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-700">
            {book.status}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-1">
          <h3 className="text-sm font-bold text-slate-900 truncate group-hover:text-violet-600 transition-colors">
            {book.title || "Untitled Masterpiece"}
          </h3>
          <p className="text-xs font-medium text-slate-500 mt-0.5 truncate">
            {book.author || "Unknown Author"}
          </p>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-between text-[10px] text-slate-400 font-semibold uppercase tracking-tight">
          <span>{book.pages || 0} Pages</span>
          <span>{new Date(book.updatedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
