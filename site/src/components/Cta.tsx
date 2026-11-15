import { GithubLogo } from "@phosphor-icons/react/dist/ssr";
import { REPO_URL } from "@/lib/config";

export function Cta({ spark = false, className = "" }: { spark?: boolean; className?: string }) {
  const base =
    "inline-flex items-center gap-2 whitespace-nowrap rounded-full px-6 py-3 font-semibold tracking-[-0.02em] transition-transform";
  const look = spark ? "spark" : "bg-ink text-white hover:bg-neutral-800";
  return (
    <a href={REPO_URL} className={`${base} ${look} ${className}`}>
      <GithubLogo size={18} weight="bold" aria-hidden />
      Go to the GitHub repo
    </a>
  );
}
