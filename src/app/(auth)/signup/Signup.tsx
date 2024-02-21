"use client"
import toast from "react-hot-toast";
import { auth } from "@/app/(auth)/Firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React ,{ useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/app/assets/logo.png";

function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password)
      return toast.error("Please fill in all the fields") && setLoading(false);
    try {
      // create user with email and password
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
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
                    width={200}
                    height={200}
                    alt="logo"
                  />
                  <h2 className="mb-8 text-3xl text-cyan-900  font-bold">
                    Log in to unlock the best of Trello Magic App.
                  </h2>
                </div>
                <div className="mt-10 grid space-y-4 px-5">
                  <form onSubmit={handleSignup}>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email/User
                        </label>
                        <input
                          type="email"
                          name="email"
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
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="group h-12 px-6 border-2 rounded-lg outline-none border-pink-400"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className={`flex items-center justify-center ${
                          loading ? "font-normal" : "font-semibold"
                        } text-cyan-900 tracking-wide h-12 px-6 border rounded-lg hover:bg-pink-400 hover:text-white transition-all ease-in-out duration-300 hover:border`}
                      >
                        {loading ? (
                          <ClipLoader size={18} color="#ee2b91" />
                        ) : (
                          "Sign up"
                        )}
                      </button>
                    </div>
                  </form>
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-gray-900 text-center">
                      Already have an account yet?
                    </span>
                    <button
                      className="font-medium hover:text-pink-800 underline"
                      onClick={() => {
                        router.push("/login");
                      }}
                    >
                      Login here
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

export default Signup;
