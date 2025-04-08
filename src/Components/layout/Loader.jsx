import React from "react";
import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Loader2 className="animate-spin w-10 h-10 text-blue-500" />
    </div>
  );
}
