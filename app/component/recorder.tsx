"use client";
import React, { useState, useRef } from "react";

interface RecorderProps {
    shortId: string;
    onSave: (id: string, path: string) => void;
}

const Recorder: React.FC<RecorderProps> = ({ shortId, onSave }) => {
    const [recording, setRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunks = useRef<Blob[]>([]);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        chunks.current = [];

        mediaRecorderRef.current.ondataavailable = (e) => {
            if (e.data.size > 0) chunks.current.push(e.data);
        };

        mediaRecorderRef.current.onstop = async () => {
            const blob = new Blob(chunks.current, { type: "audio/webm" });
            const filename = `${shortId}.webm`; // ✅ just id
            const file = new File([blob], filename, { type: "audio/webm" });

            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/upload-audio", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const { url } = await res.json();
                onSave(shortId, url); // ✅ update parent state
            }
        };

        mediaRecorderRef.current.start();
        setRecording(true);
    };

    const stopRecording = () => {
        mediaRecorderRef.current?.stop();
        setRecording(false);
    };

    return (
        <button
            onClick={recording ? stopRecording : startRecording}
            className={`w-12 h-12 rounded-full border flex items-center justify-center ${
                recording ? "bg-red-500" : "bg-white"
            }`}
        >
            🎙
        </button>
    );
};

export default Recorder;

