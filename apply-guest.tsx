import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { guestApplicationSchema, type GuestApplication } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Mic2, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function ApplyGuestPage() {
  const { toast } = useToast();

  const form = useForm<GuestApplication>({
    resolver: zodResolver(guestApplicationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      fileUrl: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: GuestApplication) =>
      apiRequest("POST", "/api/guest-applications", data),
    onSuccess: () => {
      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest. We'll be in touch soon.",
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
    <div className="min-h-screen bg-muted/30">
      
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Link href="/">
          <Button variant="ghost" className="mb-6" data-testid="link-back-home">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <Card>
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Mic2 className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="font-montserrat text-3xl">Be a Guest Speaker</CardTitle>
            <CardDescription className="text-base">
              Share your expertise and perspective with Teen Summit 2.0 participants
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Your full name" data-testid="input-guest-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" placeholder="your.email@example.com" data-testid="input-guest-email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} type="tel" placeholder="(555) 123-4567" data-testid="input-guest-phone" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Why do you want to be a guest? *</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Tell us about your expertise, what you'd like to discuss, and why you'd be a great fit for Teen Summit 2.0..."
                          className="min-h-32 resize-none"
                          data-testid="textarea-guest-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fileUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio/Resume Link (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} type="url" placeholder="https://example.com/your-bio" data-testid="input-guest-file-url" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={mutation.isPending}
                  data-testid="button-guest-submit"
                >
                  {mutation.isPending ? "Submitting..." : "Submit Guest Application"}
                </Button>
              </form>
            </Form>

            <div className="mt-8 pt-6 border-t">
              <h3 className="font-semibold mb-4">What to Expect:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Engage with curious, motivated teen participants</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Share your expertise on civic engagement, media, or your field</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Participate in dynamic discussions and Q&A sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Help shape the next generation of civic leaders</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
