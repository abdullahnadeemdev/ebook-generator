import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Book } from "lucide-react";
import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Button from "../../components/shared/Button";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import BookCard from "../../components/cards/BookCard";

const BookCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col h-64 animate-pulse">
      <div className="w-full h-32 bg-gray-200 rounded-xl mb-4"></div>

      <div className="flex flex-col gap-3 flex-1">
        <div className="h-5 bg-gray-200 rounded-lg w-3/4"></div>

        <div className="h-4 bg-gray-100 rounded-lg w-1/2"></div>
      </div>

      <div className="mt-auto border-t border-gray-50 pt-3 flex justify-between items-center">
        <div className="h-4 bg-gray-100 rounded-lg w-1/4"></div>
        <div className="h-8 w-8 bg-gray-100 rounded-full"></div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [bookToDelelte, setBookToDelete] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.BOOKS.GET_BOOKS);
        setBooks(response.data);
      } catch (error) {
        toast.error("failded to fetch your ebook");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleDeleteBook = async () => {
    if (!bookToDelelte) return;
  };

  const handleCreateBookClick = () => {
    setIsCreateModalOpen(true);
  };

  const handleBookCreated = (bookId) => {
    setIsCreateModalOpen(false);
    navigate(`/editor/${bookId}`);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              All eBooks
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Create, edit and manage all your AI-generated eBooks
            </p>
          </div>
          <Button
            className="whitespace-nowrap shadow-md hover:shadow-lg transition-all"
            onClick={handleCreateBookClick}
            icon={Plus}
          >
            Create eBook
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <BookCardSkeleton key={i} />
            ))}
          </div>
        ) : books.length === 0 ? (
          <div className="flex flex-col text-xl items-center justify-center py-20 px-4 bg-white rounded-3xl border border-dashed border-slate-200 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 shadow-inner text-slate-400">
              <Book size={32} />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">
              No eBooks Found
            </h3>
            <p className="text-slate-500 mt-2 mb-8 max-w-sm text-sm">
              You haven't created any books yet. Start your journey by creating
              your first AI-powered masterpiece.
            </p>
            <Button
              onClick={handleCreateBookClick}
              icon={Plus}
              className="bg-slate-900 hover:bg-slate-800"
            >
              Create new Ebook
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
              // <div
              //   key={book._id} n
              //   className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all p-5 cursor-pointer"
              // >
              //   <div className="aspect-3/4 bg-slate-50 rounded-xl mb-4 flex items-center justify-center text-slate-300 group-hover:bg-violet-50 group-hover:text-violet-200 transition-colors">
              //     <FileText size={48} />
              //   </div>
              //   <h4 className="font-bold text-slate-900 truncate">
              //     {book.title || "Untitled Book"}
              //   </h4>
              //   <p className="text-xs text-slate-500 mt-1 capitalize">
              //     {book.status || "Draft"}
              //   </p>
              // </div>

              <BookCard
                book={book}
                key={book._id}
                onDelete={() => setBookToDelete(book._id)}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
