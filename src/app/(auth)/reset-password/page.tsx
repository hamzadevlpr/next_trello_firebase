'use client';

import Container from "@/app/components/Reusable/Container";
import Image from "next/image";
import React from "react";
import { ClipLoader } from "react-spinners";
import logo from "../../assets/logo.png";
import Link from "next/link";
import toast from "react-hot-toast";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase/firebase";

function Page() {
    const [email, setEmail] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email) return toast.error("Please fill in all the fields")
        try {
            // Sign in with Google
            const result = await sendPasswordResetEmail(auth, email);
            toast.success(`Password reset email sent to ${email}`);
        } catch (err: any) {
            if (err.response) {
                console.log(`Error: ${err.message}`);
            }
        }
    };
    return (
        <div className="h-screen flex justify-center items-center">
            <Container>
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
                                        Unlock a new beginning.

                                    </h2>
                                </div>
                                <div className="mt-10 space-y-4 px-5">
                                    <form onSubmit={handleReset}>
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
                                                <p className="px-2 !text-xs font-normal text-cyan-900 text-left">
                                                    We will send you an email with instructions on how to reset your password.
                                                </p>
                                            </div>
                                            <button
                                                type="submit"
                                                data-id="loginbtn"
                                                disabled={loading}
                                                className={`flex items-center justify-center ${loading ? "font-normal" : "font-semibold"
                                                    } text-cyan-900 tracking-wide h-12 px-6 border rounded-lg hover:bg-pink-400 hover:text-white transition-all ease-in-out duration-300 hover:border`}
                                            >
                                                {loading ? (
                                                    <ClipLoader size={18} color="#ee2b91" />
                                                ) : (
                                                    "Reset Password"
                                                )}
                                            </button>

                                            <Link href="/login"
                                                className='bg-pink-500 flex items-center justify-center font-medium text-cyan-50 tracking-wide h-12 px-6 border-0 rounded-lg'
                                            >
                                                Back to Login
                                            </Link>
                                        </div>
                                    </form>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Page;
