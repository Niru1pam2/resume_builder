import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function page() {
  return (
    <main className="max-w-7xl mx-auto space-y-6 px-3 py-6 text-center">
      <h1 className="font-bold text-3xl tracking-tight">Billing Success</h1>
      <p>The payment was sucessfull and your Pro account has been activated.</p>
      <Button asChild>
        <Link href={`/resumes`}>Go to resumes</Link>
      </Button>
    </main>
  );
}
