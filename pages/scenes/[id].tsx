import { useRouter } from 'next/router';
import { useRef } from "react";
import { useChat } from "ai/react";
import {
  UserIcon,
  LoadingCircle,
  SendIcon,
} from "../../components/icon";
import Textarea from "react-textarea-autosize";
import clsx from "clsx";
import '../../styles/globals.css';
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { AIReply } from '@/types';
import AlertModal from '@/components/alertModal';
import { scenes } from "@/constants";

const Scene = () => {
  const router = useRouter();
  const { sceneId } = router.query; 
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [score, setScore] = useState(20);
  const [showModal, setShowModal] = useState(false);
  const [points, setPoints] = useState<number[]>([]);
  const theme = scenes.find(scene => scene.id === Number(sceneId))?.text;
  const { messages, input, setInput, handleSubmit, isLoading} = useChat({
    body:{
      scene:theme,
    },
    onError: (err: Error) => {
      console.log('err', err)
    },
    onFinish: (message) => {
      const data = JSON.parse(message.content) as AIReply;
      setPoints(prevPoints => [...prevPoints, Number(data.points)]);
      setScore((prevScore) => prevScore + Number(data.points));
    },
  });
  const disabled = isLoading || input.length === 0;
  useEffect(() => {
    if (score === 0 || score === 100) {
      setShowModal(true); 
    } else {
      setShowModal(false); 
    }
  }, [score]);

  const curPoint = points[points.length-1];
  
  return (
    <main className="flex flex-col items-center justify-between pb-40">
      <div className='border-gray-200 sm:mx-0 m-4 max-w-screen-md rounded-md border sm:w-full'>
        <div className='flex flex-col space-y-2 p-7 sm:p-2'>
          <h1 className="flex justify-between items-center font-semibold text-black">
          场景: {theme}
          </h1>
          <div className='w-full'>
          <div className='flex w-full items-center justify-between mb-2'>
            <span className='text-sm text-gray-500'>原谅值</span>
            <span className='text-sm font-semibold'>{score}/100</span>
            <AlertModal
              isOpen={showModal}
              message={score === 100 ? "哄哄成功，TA和你重归于好啦" : "哄哄失败，TA离你而去了"}
              onClose={() => setShowModal(false)}
            />
          </div>
          <div className='h-3 rounded-full bg-gray-200'>
            <div className='h-full bg-red-500 rounded-full' style={{ width: `${score}%` }}></div>
          </div>
        </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-center border-b border-gray-200 py-8 bg-gray-100">
        <div className="flex w-full max-w-screen-md items-start space-x-4 px-5 sm:px-0">
          <div className="bg-white">  
              <Image
                src="/logo.png"
                alt="logo"
                width={36}
                height={36}
              />
            </div>
            <div className="prose prose-p:leading-relaxed mt-1 w-full break-words">
              哼
            </div>
          </div>
      </div>
      {messages.map((message, i) => (
              <div
                key={i}
                className={clsx(
                  "flex w-full items-center justify-center border-b border-gray-200 py-8",
                  message.role === "user" ? "bg-white" : "bg-gray-100",
                )}
              >
                <div className="flex w-full max-w-screen-md items-start space-x-4 px-5 sm:px-0">
                  <div
                    className={clsx(
                      message.role === "assistant"
                        ? "bg-white"
                        : "bg-black p-1.5 text-white",
                    )}
                  >
                    {message.role === "user" ? (
                      <UserIcon />
                    ) : (
                      <Image
                        src="/logo.png"
                        alt="logo"
                        width={36}
                        height={36}
                      />
                    )}
                  </div>
                  <div className="prose prose-p:leading-relaxed mt-1 w-full break-words">
                    {message.role ==="assistant"? JSON.parse(message.content).reply:message.content}
                  </div>
                  {
                      message.role === "assistant"? (
                        <div className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors 
                        focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-blue-600/100 whitespace-nowrap'>
                          原谅值{curPoint >0? +curPoint:curPoint}
                        </div>
                      ):null
                  }
                </div>
              </div>
            )
          )
      }
      <div className="fixed bottom-0 flex w-full flex-col items-center space-y-3 bg-gradient-to-b from-transparent via-gray-100 to-gray-100 p-5 pb-3 sm:px-0">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="relative w-full max-w-screen-md rounded-xl border border-gray-200 bg-white px-4 pb-2 pt-3 shadow-lg sm:pb-3 sm:pt-4"
        >
          <Textarea
            ref={inputRef}
            tabIndex={0}
            required
            rows={1}
            autoFocus
            placeholder="快！哄哄女朋友！！"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                formRef.current?.requestSubmit();
                e.preventDefault();
              }
            }}
            spellCheck={false}
            className="w-full pr-10 focus:outline-none"
          />
          <button
            className={clsx(
              "absolute inset-y-0 right-3 my-auto flex h-8 w-8 items-center justify-center rounded-md transition-all",
              disabled
                ? "cursor-not-allowed bg-white"
                : "bg-green-500 hover:bg-green-600",
            )}
            disabled={disabled}
            >
            {isLoading ? (
              <LoadingCircle />
            ) : (
              <SendIcon
                className={clsx(
                  "h-4 w-4",
                  input.length === 0 ? "text-gray-300" : "text-white",
                )}
              />
            )}
          </button>
        </form>
      </div>
    </main>
  );
}

export default Scene;