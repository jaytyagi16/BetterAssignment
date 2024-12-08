import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState("Login");

  const validationSchema = yup.object({
    email: yup.string().email("Invalid email address").required("Email is required!"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required!"),
  });

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength === 0) return { color: "gray", label: "No Password" };
    if (strength === 1) return { color: "red", label: "Weak" };
    if (strength === 2) return { color: "orange", label: "Moderate" };
    if (strength >= 3) return { color: "green", label: "Strong" };
  };

  return (
    <div className="bg-slate-200 w-[350px] h-auto p-4 rounded-md shadow-lg mt-24">
      <h1 className="text-black mb-4 text-center font-semibold text-2xl">
        {state === "Login" ? "Login" : "Sign Up"}
      </h1>

      <Formik
        initialValues={{ email: "", password: "", rememberMe: true }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          console.log("Form Submitted:", values);

          setTimeout(() => {
            setSubmitting(false);
            if (state === "Login") {
              toast.success("Login Successful!");
              if (values.rememberMe) {
                localStorage.setItem("loginInfo", JSON.stringify({ email: values.email, password: values.password }));
              }
            } else {
              toast.success("Account Created Successfully!");
            }
          }, 2000);
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => {
          const passwordStrength = getPasswordStrength(values.password);

          return (
            <Form className="flex flex-col gap-4">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="text-black">
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400"
                  placeholder="johndoe@gmail.com"
                />
                <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1" />
              </div>

              {/* Password Field */}
              <div className="relative">
                <label htmlFor="password" className="text-black">
                  Password
                </label>
                <div className="relative">
                  <Field
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400"
                    placeholder="johndoe!1234@"
                  />
                  {/* Eye Icon */}
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-gray-700 transition"
                  >
                    {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
                  </span>
                </div>
                <ErrorMessage name="password" component="div" className="text-red-400 text-sm mt-1" />
              </div>

              {/* Password Strength Indicator (only in Signup state) */}
              {state === "Signup" && (
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full`}
                    style={{ backgroundColor: passwordStrength.color }}
                  ></div>
                  <p className="text-sm font-semibold">{passwordStrength.label}</p>
                </div>
              )}

              {/* Remember Me Checkbox (only in Login state) */}
              {state === "Login" && (
                <div className="flex gap-2 items-center">
                  <Field
                    id="rememberMe"
                    type="checkbox"
                    name="rememberMe"
                    checked={values.rememberMe}
                    onChange={() => setFieldValue("rememberMe", !values.rememberMe)}
                    className="cursor-pointer"
                  />
                  <label htmlFor="rememberMe" className="cursor-pointer text-sm ">Remember me</label>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              >
                {state === "Login" ? "Login" : "Sign up"}
              </button>

              <p className="pt-2 text-sm">
                {state === "Login" ? "Don't have an account? " : "Already have an account? "}
                <span
                  onClick={() => setState(state === "Login" ? "Signup" : "Login")}
                  className="underline text-blue-600 cursor-pointer"
                >
                  {state === "Login" ? "Sign up" : "Login"}
                </span>
              </p>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default Login;