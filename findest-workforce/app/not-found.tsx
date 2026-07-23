import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PixelMascot } from "@/components/PixelMascot";

export default function NotFound() {
  return (
    <main className="min-h-screen grid place-items-center px-6">
      <div className="text-center max-w-md">
        <PixelMascot crew="workspace" size={80} color="#3A2A1F" className="mx-auto" />
        <h1 className="heading-serif text-5xl mt-6">404</h1>
        <p className="text-ink-soft mt-2">Halaman ga ketemu, bro.</p>
        <Link href="/" className="inline-block mt-6">
          <Button variant="accent">Back to workspace</Button>
        </Link>
      </div>
    </main>
  );
}
