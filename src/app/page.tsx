import { buttonVariants } from "@/shared/styles/components/ui";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-5 text-center">
      <h1 className="text-4xl font-bold">Startseite</h1>
      <Link href="/auth/login" className={buttonVariants()}>
        Anmelden
      </Link>
    </div>
  );
}
