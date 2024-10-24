import React from "react";
import MemoryCards from "./MemoryCards";

export default function MainComponent() {
    return (
        <div className="w-full min-h-[100dvh] bg-[#fefefe] flex justify-center items-center">
            <MemoryCards />
        </div>
    );
}
