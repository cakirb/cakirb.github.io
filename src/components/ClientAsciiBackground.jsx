"use client";

import dynamic from "next/dynamic";

const AsciiBackground = dynamic(() => import("@/components/AsciiBackground"), {
    ssr: false,
});

export default function ClientAsciiBackground() {
    return <AsciiBackground />;
}
