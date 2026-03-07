import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [emailVerified, setEmailVerified] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const initialEmailValues = { email: "" };
  const emailSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
  });
  const passwordSchema = Yup.object({
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm password is required"),
  });
  const handleEmailSubmit = (values, { setFieldError }) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const normalizedEmail = values.email.trim().toLowerCase();
    const user = users.find((u) => u.email.toLowerCase() === normalizedEmail);

    if (!user) {
      setFieldError("email", "Email does not exist");
      return;
    }

    setUserEmail(normalizedEmail);
    setEmailVerified(true);
  };

  const handlePasswordSubmit = (values) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.email.toLowerCase() === userEmail
        ? { ...u, password: values.newPassword }
        : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    toast.success("Password updated successfully!");
    navigate("/signin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f172a] to-[#1e293b] px-4">
      <div className="w-full max-w-md bg-[#1e293b] rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Forgot Password
        </h2>

        {!emailVerified ? (
          <Formik
            initialValues={initialEmailValues}
            validationSchema={emailSchema}
            onSubmit={handleEmailSubmit}
          >
            {({ errors, touched }) => (
              <Form className="space-y-4">
                <div>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className={`w-full px-4 py-2 rounded-lg bg-[#0f172a] text-white placeholder-gray-400 border
                      ${errors.email && touched.email ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:ring-[#22d3ee]"} focus:outline-none focus:ring-2`}
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-400 text-sm mt-1"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#22d3ee] text-[#0f172a] font-semibold py-2 rounded-lg hover:bg-[#1e40af] transition duration-300"
                >
                  Verify Email
                </button>
              </Form>
            )}
          </Formik>
        ) : (
          
          <Formik
            initialValues={{ newPassword: "", confirmPassword: "" }}
            validationSchema={passwordSchema}
            onSubmit={handlePasswordSubmit}
          >
            {({ errors, touched }) => (
              <Form className="space-y-4">
                <div>
                  <Field
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    className={`w-full px-4 py-2 rounded-lg bg-[#0f172a] text-white placeholder-gray-400 border
                      ${errors.newPassword && touched.newPassword ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:ring-[#22d3ee]"} focus:outline-none focus:ring-2`}
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="p"
                    className="text-red-400 text-sm mt-1"
                  />
                </div>

                <div>
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className={`w-full px-4 py-2 rounded-lg bg-[#0f172a] text-white placeholder-gray-400 border
                      ${errors.confirmPassword && touched.confirmPassword ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:ring-[#22d3ee]"} focus:outline-none focus:ring-2`}
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="p"
                    className="text-red-400 text-sm mt-1"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#22d3ee] text-[#0f172a] font-semibold py-2 rounded-lg hover:bg-[#1e40af] transition duration-300"
                >
                  Reset Password
                </button>
              </Form>
            )}
          </Formik>
        )}

        <p className="text-gray-400 text-sm mt-4 text-center">
          Remember your password?{" "}
          <span
            className="text-[#22d3ee] cursor-pointer"
            onClick={() => navigate("/SignIn")}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
