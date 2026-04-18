import React from "react";
import { useState } from "react";
import { Link, userNavigate } from "react-router";
import { Mail, Lock, BookOpen } from "lucide-react";
import toast from "react-toastify";

import InputField from "../../components/shared/InputField";
import Button from "../../components/shared/Button";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const Login = () => {
  return <div>login</div>;
};

export default Login;
