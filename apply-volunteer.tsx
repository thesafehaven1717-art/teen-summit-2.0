import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { volunteerApplicationSchema, type VolunteerApplication } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Users, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function ApplyVolunteerPage() {
  const { toast } = useToast();

  const form = useForm<VolunteerApplication>({
    resolver: zodResolver(volunteerApplicationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      availability: "",
      interests: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: VolunteerApplication) =>
      apiRequest("POST", "/api/volunteer-applications", data),
    onSuccess: () => {
      toast({
        title: "Application Submitted!",
        description: "Thank you for volunteering. We'll reach out soon with next steps.",
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
              <Users className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="font-montserrat text-3xl">Volunteer with Us</CardTitle>
            <CardDescription className="text-base">
              Help bring Teen Summit 2.0 to life by volunteering your time and skills
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
                        <Input {...field} placeholder="Your full name" data-testid="input-volunteer-name" />
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
                        <Input {...field} type="email" placeholder="your.email@example.com" data-testid="input-volunteer-email" />
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
                        <Input {...field} type="tel" placeholder="(555) 123-4567" data-testid="input-volunteer-phone" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="availability"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Availability *</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="When are you available to volunteer? (e.g., weekends, evenings, specific dates)"
                          className="min-h-24 resize-none"
                          data-testid="textarea-volunteer-availability"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="interests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skills & Interests *</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Tell us about your skills, experience, and what you're most interested in helping with (e.g., production, social media, event planning, mentoring)"
                          className="min-h-32 resize-none"
                          data-testid="textarea-volunteer-interests"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={mutation.isPending}
                  data-testid="button-volunteer-submit"
                >
                  {mutation.isPending ? "Submitting..." : "Submit Volunteer Application"}
                </Button>
              </form>
            </Form>

            <div className="mt-8 pt-6 border-t">
              <h3 className="font-semibold mb-4">Ways to Volunteer:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Production support (filming, audio, editing)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Social media and marketing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Mentoring teen participants</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Event planning and coordination</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Research and fact-checking</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
