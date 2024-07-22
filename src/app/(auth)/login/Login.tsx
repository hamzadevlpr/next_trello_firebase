"use client";

import React from "react";
import toast from "react-hot-toast";
import { auth, provider } from "@/app/(auth)/Firebase/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/navigation";
import logo from "@/app/assets/logo.png";
import Image from "next/image";

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      // Sign in with Google
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      toast.success(`Welcome back ${user.displayName}!`);
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/");
    } catch (err: any) {
      if (err.response) {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password)
      return toast.error("Please fill in all the fields") && setLoading(false);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      toast.success(`Welcome back ${user?.displayName || user?.email} !`);
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/");
    } catch (err: any) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="fixed grid place-items-center backdrop-blur-sm top-0 right-0 left-0 z-50 w-full inset-0 h-modal h-full justify-center items-center">
        <div className="relative container m-auto px-6">
          <div className="m-auto md:w-[30rem]">
            <div className="rounded-xl glass-effect shadow-xl">
              <div className="p-8">
                <div className="space-y-4">
                  <Image
                    src={logo}
                    loading="lazy"
                    className="w-40"
                    alt="logo"
                    width={200}
                    height={200}
                  />
                  <h2 className="mb-8 text-3xl text-cyan-900  font-bold">
                    Log in to unlock the best of Trello Magic App.
                  </h2>
                </div>
                <div className="mt-10 space-y-4 px-5">
                  <form onSubmit={handleLogin}>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          data-id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="group h-12 px-6 border-2 rounded-lg outline-none border-pink-400"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="password"
                          className="text-sm font-medium"
                        >
                          Passsword
                        </label>
                        <input
                          type="password"
                          name="password"
                          data-id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="group h-12 px-6 border-2 rounded-lg outline-none border-pink-400"
                          autoComplete="current-password"
                        />
                      </div>
                      <button
                        type="submit"
                        data-id="loginbtn"
                        disabled={loading}
                        className={`flex items-center justify-center ${
                          loading ? "font-normal" : "font-semibold"
                        } text-cyan-900 tracking-wide h-12 px-6 border rounded-lg hover:bg-pink-400 hover:text-white transition-all ease-in-out duration-300 hover:border`}
                      >
                        {loading ? (
                          <ClipLoader size={18} color="#ee2b91" />
                        ) : (
                          "Log in"
                        )}
                      </button>
                    </div>
                  </form>

                  <div className="flex items-center gap-3">
                    <hr className="w-full border-t-2 border-gray-300" />
                    <span className="mb-2 text-gray-900 text-center">or</span>
                    <hr className="w-full border-t-2 border-gray-300" />
                  </div>

                  <div className="flex w-full gap-4">
                    <button
                      onClick={handleGoogleSignIn}
                      className="group h-12 px-6 border rounded-lg"
                    >
                      <Image
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        className="w-8"
                        alt="google logo"
                        width={20}
                        height={20}
                      />
                    </button>

                    <button
                      onClick={handleGoogleSignIn}
                      className="group h-12 px-6 border rounded-lg"
                    >
                      <Image
                        src="https://www.svgrepo.com/show/452196/facebook-1.svg"
                        className="w-8"
                        alt="facebook logo"
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>

                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-gray-900 text-center">
                      Still not have an account yet?
                    </span>
                    <button
                      className="font-medium hover:text-pink-800 underline"
                      onClick={() => {
                        router.push("/signup");
                        console.log("clicked");
                      }}
                    >
                      Register now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
