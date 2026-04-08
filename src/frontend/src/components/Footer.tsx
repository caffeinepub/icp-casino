import { Separator } from "@/components/ui/separator";
import { Coins } from "lucide-react";

const year = new Date().getFullYear();
const hostname =
  typeof window !== "undefined"
    ? encodeURIComponent(window.location.hostname)
    : "";
const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`;

const FOOTER_LINKS = [
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Support", href: caffeineUrl, external: true },
];

export function Footer() {
  return (
    <footer
      className="bg-card border-t border-border mt-auto"
      data-ocid="footer"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-primary flex items-center justify-center">
              <Coins className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-foreground">
              ICP <span className="text-primary">Casino</span>
            </span>
          </div>

          {/* Links */}
          <nav
            className="flex items-center gap-1 flex-wrap justify-center"
            aria-label="Footer navigation"
          >
            {FOOTER_LINKS.map((link, i) => (
              <span key={link.label} className="flex items-center gap-1">
                {i > 0 && (
                  <Separator orientation="vertical" className="h-3 mx-1" />
                )}
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                >
                  {link.label}
                </a>
              </span>
            ))}
          </nav>
        </div>

        <Separator className="my-4" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>
            © {year}. Built with love using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline transition-smooth"
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-center">
            Play responsibly. Gambling can be addictive. 18+ only.
          </p>
        </div>
      </div>
    </footer>
  );
}
