"use client";
import Image from "next/image";
import Link from "next/link";

const examples = [
  {text: "你回家太晚,女朋友很生气", id:1},
  {text: "你炒股亏了20万,被对象发现了", id:2},
  {text: "女朋友吃胖了,你想和她一起减肥ᕙ(`▿´)ᕗ,然后就生气了", id:3},
  {text: "你在厕所拉屎,女朋友也在闹肚子，但只有一个马桶,最后女朋友拉在裤兜子里了,她很生气", id:4},
  {text: "女友来例假，疼的死去活来，你却让她多喝热水", id:5},
];

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
            {examples.map((example) => (
              <Link key={example.id} href={`/scenes/${encodeURIComponent(example.id)}?text=${encodeURIComponent(example.text)}`} passHref>
                <p className="rounded-md border border-gray-200 bg-white px-5 py-3 text-left text-sm text-gray-500 transition-all duration-75 hover:border-black hover:text-gray-700 active:bg-gray-50">
                    {example.text}
                </p>
              </Link>
            ))}
          </div>
        </div>
    </main>
  );
}
