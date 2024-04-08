"use client";
import Image from "next/image";
import Link from "next/link";
import { scenes } from "@/constants";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between pb-40">
        <div className="border-gray-200sm:mx-0 mx-5 mt-20 max-w-screen-md rounded-md border sm:w-full">
          <div className="flex flex-col space-y-4 p-7 sm:p-10">
            <Image
              src="/logo.png"
              alt="HongHonglogo"
              width={40}
              height={40}
              className="h-20 w-20"
            />
            <h1 className="text-lg font-semibold text-black">
              HongHong
            </h1>
            <p className="text-gray-500">
              HongHong Japanese Version
            </p>
          </div>
          <div className="flex flex-col space-y-4 border-t border-gray-200 bg-gray-50 p-7 sm:p-10">
            {scenes.map((scene) => (
              <Link key={scene.id} href={`/scenes/${encodeURIComponent(scene.id)}`} passHref>
                <p className="rounded-md border border-gray-200 bg-white px-5 py-3 text-left text-sm text-gray-500 transition-all duration-75 hover:border-black hover:text-gray-700 active:bg-gray-50">
                    {scene.text}
                </p>
              </Link>
            ))}
          </div>
        </div>
    </main>
  );
}
