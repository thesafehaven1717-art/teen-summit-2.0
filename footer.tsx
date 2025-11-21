import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Instagram, Youtube, Twitter, Facebook } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsletterSignupSchema, type NewsletterSignup } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram", testId: "link-instagram" },
  { icon: Youtube, href: "#", label: "YouTube", testId: "link-youtube" },
  { icon: Twitter, href: "#", label: "Twitter", testId: "link-twitter" },
  { icon: Facebook, href: "#", label: "Facebook", testId: "link-facebook" },
];

const quickLinks = [
  { label: "What Is Teen Summit 2.0?", href: "#what-is", testId: "link-what-is" },
  { label: "The Three Acts", href: "#three-acts", testId: "link-three-acts" },
  { label: "Why This Matters", href: "#why-this-matters", testId: "link-why-matters" },
  { label: "Episodes", href: "/episodes", testId: "link-episodes" },
  { label: "Blog", href: "/blog", testId: "link-blog" },
  { label: "Acknowledgments", href: "/acknowledgments", testId: "link-acknowledgments" },
  { label: "Contact Us", href: "/contact", testId: "link-contact" },
  { label: "Get Involved", href: "#get-involved", testId: "link-get-involved" },
];

export function Footer() {
  const { toast } = useToast();

  const form = useForm<NewsletterSignup>({
    resolver: zodResolver(newsletterSignupSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: NewsletterSignup) =>
      apiRequest("POST", "/api/newsletter/signup", data),
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You've been added to our newsletter.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <footer role="contentinfo" className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Newsletter Signup */}
        <div className="mb-12 pb-12 border-b border-border">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-montserrat font-bold text-2xl md:text-3xl text-foreground mb-4">
              Stay Connected
            </h3>
            <p className="font-inter text-base text-muted-foreground mb-6">
              Subscribe to our newsletter for updates on casting calls, episodes, and events.
            </p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter your email"
                          data-testid="input-footer-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="font-montserrat font-semibold"
                  data-testid="button-footer-signup"
                >
                  {mutation.isPending ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </Form>
          </div>
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div className="md:col-span-2">
            <h4 className="font-montserrat font-bold text-xl text-foreground mb-4">
              Teen Summit 2.0
            </h4>
            <p className="font-inter text-sm text-muted-foreground leading-relaxed mb-4">
              A reimagined civic space from the Teen Summit of BET fame, empowering youth voices through debate, musicology, and podcasting. A Communiversity Public Media Project in partnership with the University of Illinois Urbana-Champaign.
            </p>
            <p className="font-inter text-xs text-muted-foreground">
              Made possible by the generous support of Distinguished UIUC Alumna Sheila Johnson.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-montserrat font-bold text-lg text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="font-inter text-sm text-muted-foreground hover:text-primary transition-colors"
                    data-testid={link.testId}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-montserrat font-bold text-lg text-foreground mb-4">
              Connect
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover-elevate transition-all"
                    data-testid={social.testId}
                  >
                    <Icon className="w-5 h-5 text-muted-foreground" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="font-inter text-sm text-muted-foreground">
              © 2025 Teen Summit 2.0. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="/privacy"
                className="font-inter text-sm text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-privacy"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="font-inter text-sm text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-terms"
              >
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
