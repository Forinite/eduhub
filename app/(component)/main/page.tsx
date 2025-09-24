"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {gst112Shorts} from "@/constant/courses/gst112";

// import Recorder from "@/app/component/recorder";

const MainPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    // const [audioMap, setAudioMap] = useState<Record<string, string>>({});

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "s" || e.key === "d") {
                setCurrentIndex((prev) =>
                    Math.min(prev + 1, gst112Shorts.length - 1)
                );
            } else if (e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "w" || e.key === "a" ) {
                setCurrentIndex((prev) => Math.max(prev - 1, 0));
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            const child = container.children[currentIndex] as HTMLElement;
            if (child) {
                child.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [currentIndex]);

    // // Check audio existence for each short when component mounts
    // useEffect(() => {
    //     const checkFiles = async () => {
    //         const results: Record<string, string> = {};
    //         for (const short of Chm102Shorts) {
    //             const res = await fetch(`/api/check-audio?id=${short.id}`);
    //             if (res.ok) {
    //                 const data = await res.json();
    //                 if (data.exists) {
    //                     results[short.id] = data.url;
    //                 }
    //             }
    //         }
    //         setAudioMap(results);
    //     };
    //     checkFiles();
    // }, []);

    return (
        <div className="flex justify-center w-full bg-white text-black">
            <div
                ref={containerRef}
                className="w-full h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
            >
                {gst112Shorts.map((short) => (
                    <div
                        key={short.id}
                        className="max-w-[400px] w-[90%] h-screen mx-auto flex items-center justify-center snap-start relative"
                    
                        <div className="h-[90%] w-full flex flex-col items-center justify-center border py-12 px-4 relative">
                            {short.image && (
                                <Image
                                    src={short.image}
                                    alt={short.title}
                                    width={300}
                                    height={200}
                                />
                            )}

                            <div className="w-full h-full flex items-center justify-center text-center font-semibold">
                                {short.text}
                            </div>

                            <div className="absolute bottom-16 left-4 text-sm">
                                <p className="font-semibold">{short.title}</p>
                            </div>

                            <div className="absolute bottom-16 right-4">
                                {/*<Recorder*/}
                                {/*    shortId={short.id}*/}
                                {/*    onSave={(id, path) => {*/}
                                {/*    // after upload, refresh file check*/}
                                {/*    setAudioMap((prev) => ({ ...prev, [id]: path }))}} />*/}
                            </div>

                            {/* ✅ Show playback if file exists */}
                            {/*{audioMap[short.id] && (*/}
                            {/*    <audio*/}
                            {/*        controls*/}
                            {/*        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-64"*/}
                            {/*    >*/}
                            {/*        <source src={audioMap[short.id]} type="audio/webm" />*/}
                            {/*    </audio>*/}
                            {/*)}*/}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainPage;




