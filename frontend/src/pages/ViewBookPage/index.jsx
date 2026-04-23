import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Book } from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import ViewBook from "../../components/view/ViewBook";

const ViewBookSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-48 h-64 bg-slate-200 rounded-2xl shrink-0 shadow-sm"></div>
        <div className="flex-1 space-y-4 w-full">
          <div className="h-10 bg-slate-200 rounded-lg w-3/4"></div>
          <div className="h-6 bg-slate-200 rounded-lg w-1/2"></div>
          <div className="pt-4 flex gap-3">
            <div className="h-10 bg-slate-200 rounded-xl w-32"></div>
            <div className="h-10 bg-slate-200 rounded-xl w-32"></div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="h-4 bg-slate-200 rounded w-full"></div>
          <div className="h-4 bg-slate-200 rounded w-full"></div>
          <div className="h-4 bg-slate-200 rounded w-5/6"></div>
        </div>
        <div className="h-64 bg-slate-100 rounded-2xl border border-slate-200"></div>
      </div>
    </div>
  );
};

const index = () => {
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { bookId } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axiosInstance.get(
          `${API_PATHS.BOOKS.GET_BOOK_BY_ID}/${bookId}`,
        );
        setBook(response.data);
      } catch (error) {
        toast.error("Failed to fetch ebook");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);
  return (
    <DashboardLayout>
      <div className="py-8 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-64px)] bg-slate-50/50">
        {isLoading ? (
          <ViewBookSkeleton />
        ) : book ? (
          <ViewBook book={book} />
        ) : (
          /* Not Found State */
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
              <Book className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              eBook Not Found
            </h3>
            <p className="text-slate-500 mt-2 max-w-sm">
              The ebook you are looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => window.history.back()}
              className="mt-8 text-sm font-semibold text-violet-600 hover:text-violet-700 transition-colors"
            >
              ← Go back to Dashboard
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default index;
