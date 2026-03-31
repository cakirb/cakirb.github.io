"use client";

import dynamic from "next/dynamic";

const ThreeBackground = dynamic(() => import("@/components/ThreeBackground"), {
    ssr: false,
});

export default function ClientThreeBackground() {
    return <ThreeBackground />;
}
