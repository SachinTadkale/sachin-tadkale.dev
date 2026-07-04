import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact,
  faNode,
  faPython,
  faAws,
  faDocker,
  faLinux,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCodeBranch,
  faBrain,
  faPenNib,
  faSliders,
  faCode,
  faRocket,
  faServer,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  LangChainIcon,
  NextJsIcon,
  OpenAIIcon,
  PostgresIcon,
  RagIcon,
  RedisIcon,
  TypeScriptIcon,
  VectorDbIcon,
  VercelIcon,
} from "./techSvgs";

type TechIconProps = {
  name: string;
  size?: number;
  className?: string;
};

const faMap: Record<string, IconDefinition> = {
  React: faReact,
  "Node.js": faNode,
  Python: faPython,
  AWS: faAws,
  Docker: faDocker,
  Linux: faLinux,
  "CI/CD": faCodeBranch,
  "Prompt engineering": faPenNib,
  "Fine-tuning": faSliders,
};

const svgMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "Next.js": NextJsIcon,
  TypeScript: TypeScriptIcon,
  Vercel: VercelIcon,
  "OpenAI API": OpenAIIcon,
  LangChain: LangChainIcon,
  Redis: RedisIcon,
  PostgreSQL: PostgresIcon,
  "RAG pipelines": RagIcon,
  "Vector DBs": VectorDbIcon,
};

export function TechIcon({ name, size = 18, className }: TechIconProps) {
  const fa = faMap[name];
  if (fa) {
    return <FontAwesomeIcon icon={fa} style={{ width: size, height: size }} className={className} />;
  }

  const Svg = svgMap[name];
  if (Svg) {
    return <Svg size={size} className={className} />;
  }

  return <FontAwesomeIcon icon={faCode} style={{ width: size, height: size }} className={className} />;
}

export function GroupIcon({ type, size = 20, className }: { type: string; size?: number; className?: string }) {
  const icons: Record<string, IconDefinition> = {
    ship: faRocket,
    scale: faServer,
    ai: faBrain,
  };
  const icon = icons[type] ?? faCode;
  return <FontAwesomeIcon icon={icon} style={{ width: size, height: size }} className={className} />;
}
