import Image from "next/image";
import { cn } from "@/lib/utils";

type TechIconProps = {
  name: string;
  size?: number;
  className?: string;
};

const nameMap: Record<string, string> = {
  "Next.js": "nextjs",
  "Node.js": "nodejs",
  "Spring Boot": "springboot",
  "OpenAI API": "openai",
  "RAG pipelines": "rag",
  Pinecone: "pinecone",
  "Hugging Face": "hugging-face",
  "CI/CD": "devops",
  Linux: "linux",
};

export function TechIcon({ name, size = 20, className }: TechIconProps) {
  const slug =
    nameMap[name] ||
    name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-");

  return (
    <div
      className={cn(
        "tech-icon-container select-none pointer-events-none",
        className,
      )}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <Image
        src={`/tech-stack/${slug}.webp`}
        alt={`${name} icon`}
        width={size}
        height={size}
        className="object-contain w-full h-full select-none pointer-events-none"
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
}
