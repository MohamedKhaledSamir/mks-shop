import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
      <Loader2 size={70} className="animate-spin" color="blue" />
    </div>
  );
}
