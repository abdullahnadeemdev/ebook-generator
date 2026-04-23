import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Camera,
  BookOpen,
  Star,
  Save,
  LogOut,
} from "lucide-react";
import { toast } from "react-toastify";

// Adjust these import paths based on your actual folder structure
import DashboardLayout from "../../components/layout/DashboardLayout";
import InputField from "../../components/shared/InputField";
import Button from "../../components/shared/Button";

const Profile = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [userData, setUserData] = useState({
    name: "Abdullah Nadeem",
    email: "abdullah@example.com",
    bio: "Passionate writer and full-stack developer building amazing tools.",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Profile updated successfully!");
    }, 1000);
  };

  const handleLogout = () => {
    // Add your actual logout logic here (clear tokens, redirect, etc.)
    toast.info("Logging out...");
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-500">
        {/* Page Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Profile Settings
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage your account details and author profile.
            </p>
          </div>
          <Button
            variant="ghost"
            className="text-red-600 hover:bg-red-50 hover:text-red-700 w-fit"
            onClick={handleLogout}
            icon={LogOut}
          >
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Avatar & Stats */}
          <div className="space-y-8">
            {/* Avatar Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center flex flex-col items-center">
              <div className="relative group cursor-pointer mb-4">
                <div className="w-32 h-32 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 text-4xl font-bold border-4 border-white shadow-md overflow-hidden">
                  {/* Replace with <img /> if you have an avatar URL */}
                  {userData.name.charAt(0)}
                </div>
                <div className="absolute inset-0 bg-slate-900/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                {userData.name}
              </h2>
              <p className="text-sm text-slate-500 mb-6">{userData.email}</p>
              <div className="w-full px-4 py-2 bg-violet-50 text-violet-700 rounded-lg text-sm font-semibold border border-violet-100">
                Pro Member
              </div>
            </div>

            {/* Author Stats Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500" />
                Author Stats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3 text-slate-600">
                    <BookOpen className="w-5 h-5 text-violet-500" />
                    <span className="font-medium">Total Books</span>
                  </div>
                  <span className="text-lg font-bold text-slate-900">12</span>
                </div>
                <div className="flex items-center justify-between pb-2">
                  <div className="flex items-center gap-3 text-slate-600">
                    <User className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Member Since</span>
                  </div>
                  <span className="font-medium text-slate-900">Nov 2025</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Settings Form */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 md:p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-violet-600" />
                  Personal Information
                </h3>

                <form onSubmit={handleSaveChanges} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      label="Full Name"
                      name="name"
                      value={userData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                    />
                    <InputField
                      label="Email Address"
                      name="email"
                      type="email"
                      value={userData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Author Bio
                    </label>
                    <textarea
                      name="bio"
                      value={userData.bio}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all text-sm resize-none custom-scrollbar"
                      placeholder="Tell your readers a little about yourself..."
                    />
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex justify-end">
                    <Button
                      type="submit"
                      isLoading={isSaving}
                      icon={Save}
                      className="bg-violet-600 hover:bg-violet-700 text-white px-8"
                    >
                      Save Changes
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Security Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Lock className="w-5 h-5 text-slate-600" />
                Security
              </h3>
              <p className="text-sm text-slate-500 mb-4">
                Ensure your account is using a long, random password to stay
                secure.
              </p>
              <Button variant="secondary" className="border-slate-200">
                Change Password
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
