import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { SearchCommand } from "@/components/search-command";
import logoImage from "@assets/generated_images/Teens_black_tracksuits_orange_blue_9b156a60.png";

export function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/episodes", label: "Episodes" },
    { href: "/blog", label: "Blog" },
    { href: "/dossiers", label: "Dossiers" },
    { href: "/contact", label: "Contact" },
    { href: "/#about", label: "About" },
    { href: "/#impact", label: "Impact" },
    { href: "/#get-involved", label: "Get Involved" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      const sectionId = href.substring(2);
      
      // If we're on the homepage, scroll to section
      if (location === "/") {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          // Update URL hash without triggering navigation
          window.history.pushState(null, "", href);
          setMobileMenuOpen(false);
        }
      } else {
        // If we're on a different page, navigate to homepage first
        // The browser will handle the hash navigation automatically
        setMobileMenuOpen(false);
      }
    }
  };

  return (
    <header role="banner">
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center gap-4 h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" data-testid="link-home">
            <img 
              src={logoImage} 
              alt="Teen Summit 2.0" 
              className="h-20 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                data-testid={`link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {link.label}
              </a>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchOpen(true)}
              className="gap-2"
              data-testid="button-search"
              aria-label="Search content"
            >
              <Search className="h-4 w-4" />
              <span className="hidden lg:inline text-xs text-muted-foreground">
                ⌘K
              </span>
            </Button>
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button size="sm" data-testid="button-dashboard">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button size="sm" variant="outline" data-testid="button-login-nav">
                    Cast Login
                  </Button>
                </Link>
                <Link href="/admin-portal">
                  <Button size="sm" data-testid="button-admin-login">
                    Admin Portal
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full justify-start gap-2"
                data-testid="button-search-mobile"
              >
                <Search className="h-4 w-4" />
                Search
              </Button>
              {navLinks.map((link) => (
                <Button
                  key={link.href}
                  variant="ghost"
                  size="default"
                  className="w-full justify-start"
                  asChild
                >
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    data-testid={`mobile-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.label}
                  </a>
                </Button>
              ))}
              {isAuthenticated ? (
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="sm" className="w-full" data-testid="button-dashboard-mobile">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button size="sm" className="w-full" variant="outline" data-testid="button-login-mobile">
                      Cast Login
                    </Button>
                  </Link>
                  <Link href="/admin-portal" onClick={() => setMobileMenuOpen(false)}>
                    <Button size="sm" className="w-full" data-testid="button-admin-login-mobile">
                      Admin Portal
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
        
        <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
      </div>
      </nav>
    </header>
  );
}
