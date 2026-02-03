import { ChevronRight, Home } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items = [], className }: BreadcrumbProps) {
  return (
    <nav
      className={cn(
        "flex items-center gap-2 text-sm text-gray-600 py-4",
        className
      )}
      aria-label="Breadcrumb"
    >
      <Link href="/" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
        <Home size={16} />
        <span className="hidden sm:inline">Accueil</span>
      </Link>

      {items?.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight size={16} className="text-gray-400" />
          {item.current ? (
            <span className="text-gray-900 font-medium">{item.label}</span>
          ) : item.href ? (
            <Link
              href={item.href}
              className="hover:text-blue-600 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
