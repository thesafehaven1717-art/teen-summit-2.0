import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  guestApplicationSchema,
  volunteerApplicationSchema,
  contactFormSchema,
  summiteerApplicationSchema,
  type GuestApplication,
  type VolunteerApplication,
  type ContactForm,
  type SummiteerApplication,
} from "@shared/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Mic2, Users, Mail, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/scroll-reveal";

function GuestApplicationForm() {
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

        <Button
          type="submit"
          size="lg"
          className="w-full font-montserrat font-semibold"
          disabled={mutation.isPending}
          data-testid="button-guest-submit"
        >
          {mutation.isPending ? "Submitting..." : "Submit Guest Application"}
        </Button>
      </form>
    </Form>
  );
}

function VolunteerApplicationForm() {
  const { toast } = useToast();

  const form = useForm<VolunteerApplication>({
    resolver: zodResolver(volunteerApplicationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      interests: "",
      availability: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: VolunteerApplication) =>
      apiRequest("POST", "/api/volunteer-applications", data),
    onSuccess: () => {
      toast({
        title: "Application Submitted!",
        description: "Thank you for wanting to volunteer. We'll contact you soon!",
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
          name="interests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interests & Skills *</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Tell us about your skills, interests, and how you'd like to contribute..."
                  className="min-h-32 resize-none"
                  data-testid="textarea-volunteer-interests"
                />
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
                <Input {...field} placeholder="e.g., Weekends, Friday afternoons..." data-testid="input-volunteer-availability" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="lg"
          className="w-full font-montserrat font-semibold"
          disabled={mutation.isPending}
          data-testid="button-volunteer-submit"
        >
          {mutation.isPending ? "Submitting..." : "Submit Volunteer Application"}
        </Button>
      </form>
    </Form>
  );
}

function SummiteerApplicationForm() {
  const { toast } = useToast();

  const form = useForm<SummiteerApplication>({
    resolver: zodResolver(summiteerApplicationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      age: "",
      school: "",
      grade: "",
      parentName: "",
      parentEmail: "",
      parentPhone: "",
      whyJoin: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: SummiteerApplication) =>
      apiRequest("POST", "/api/summiteer-applications", data),
    onSuccess: () => {
      toast({
        title: "Application Submitted!",
        description: "Welcome to the movement! We'll be in touch soon with next steps.",
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-8">
        <StaggerContainer>
          {/* Student Information */}
          <StaggerItem>
            <div className="space-y-6">
              <h4 className="font-montserrat font-bold text-lg text-foreground border-b pb-2">
                Your Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Your full name" data-testid="input-summiteer-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Your age" data-testid="input-summiteer-age" />
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
                      <FormLabel>Your Email *</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" placeholder="your.email@example.com" data-testid="input-summiteer-email" />
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
                      <FormLabel>Your Phone *</FormLabel>
                      <FormControl>
                        <Input {...field} type="tel" placeholder="(555) 123-4567" data-testid="input-summiteer-phone" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="school"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>School Name *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Your school" data-testid="input-summiteer-school" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="grade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grade Level *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., 9th, 10th, 11th, 12th" data-testid="input-summiteer-grade" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </StaggerItem>

          {/* Parent/Guardian Information */}
          <StaggerItem>
            <div className="space-y-6">
              <h4 className="font-montserrat font-bold text-lg text-foreground border-b pb-2">
                Parent/Guardian Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="parentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parent/Guardian Name *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Parent or guardian full name" data-testid="input-summiteer-parent-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="parentPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parent/Guardian Phone *</FormLabel>
                      <FormControl>
                        <Input {...field} type="tel" placeholder="(555) 123-4567" data-testid="input-summiteer-parent-phone" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="parentEmail"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Parent/Guardian Email *</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" placeholder="parent.email@example.com" data-testid="input-summiteer-parent-email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </StaggerItem>

          {/* Why Join */}
          <StaggerItem>
            <div className="space-y-6">
              <h4 className="font-montserrat font-bold text-lg text-foreground border-b pb-2">
                Tell Us About Yourself
              </h4>
              <FormField
                control={form.control}
                name="whyJoin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Why do you want to be a Summiteer? *</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Tell us what excites you about Teen Summit 2.0, what you hope to learn, and how you want to make an impact..."
                        className="min-h-32 resize-none"
                        data-testid="textarea-summiteer-why-join"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </StaggerItem>

          {/* Consent Notice */}
          <StaggerItem>
            <div className="bg-muted/50 border border-border rounded-md p-4">
              <p className="font-inter text-sm text-muted-foreground">
                By submitting this application, you confirm that your parent/guardian is aware of your interest in Teen Summit 2.0 and agrees to be contacted by our team.
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>

        <Button
          type="submit"
          size="lg"
          className="w-full font-montserrat font-semibold"
          disabled={mutation.isPending}
          data-testid="button-summiteer-submit"
        >
          {mutation.isPending ? "Submitting..." : "Submit Application"}
        </Button>
      </form>
    </Form>
  );
}

function ContactFormComponent() {
  const { toast } = useToast();

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: ContactForm) =>
      apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll respond as soon as possible.",
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name *</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Your full name" data-testid="input-contact-name" />
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
                <Input {...field} type="email" placeholder="your.email@example.com" data-testid="input-contact-email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject *</FormLabel>
              <FormControl>
                <Input {...field} placeholder="What is this about?" data-testid="input-contact-subject" />
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
              <FormLabel>Message *</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Your message..."
                  className="min-h-32 resize-none"
                  data-testid="textarea-contact-message"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="lg"
          className="w-full font-montserrat font-semibold"
          disabled={mutation.isPending}
          data-testid="button-contact-submit"
        >
          {mutation.isPending ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Form>
  );
}

export function GetInvolvedSection() {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-foreground mb-6">
            Get Involved
          </h2>
          <p className="font-inter text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Join the Teen Summit 2.0 movement. Whether you want to be a guest, volunteer, or just stay connected, we want to hear from you.
          </p>
        </div>

        {/* Forms Tabs */}
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="summiteer" className="w-full" id="get-involved-tabs">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 mb-8">
              <TabsTrigger value="summiteer" className="font-montserrat" data-testid="tab-summiteer">
                <Star className="w-4 h-4 mr-2" />
                Become a Summiteer
              </TabsTrigger>
              <TabsTrigger value="guest" className="font-montserrat" data-testid="tab-guest">
                <Mic2 className="w-4 h-4 mr-2" />
                Be a Guest
              </TabsTrigger>
              <TabsTrigger value="volunteer" className="font-montserrat" data-testid="tab-volunteer">
                <Users className="w-4 h-4 mr-2" />
                Volunteer
              </TabsTrigger>
              <TabsTrigger value="contact" className="font-montserrat" data-testid="tab-contact">
                <Mail className="w-4 h-4 mr-2" />
                Contact Us
              </TabsTrigger>
            </TabsList>

            <TabsContent value="summiteer">
              <ScrollReveal delay={0.1}>
                <Card className="p-8 bg-card border-card-border">
                  <div className="mb-6">
                    <h3 className="font-montserrat font-bold text-2xl text-foreground mb-2">
                      Join Teen Summit 2.0
                    </h3>
                    <p className="font-inter text-base text-muted-foreground">
                      Ready to flip the script? Apply to be a Summiteer and join the movement where debate meets hip-hop.
                    </p>
                  </div>
                  <SummiteerApplicationForm />
                </Card>
              </ScrollReveal>
            </TabsContent>

            <TabsContent value="guest">
              <Card className="p-8 bg-card border-card-border">
                <div className="mb-6">
                  <h3 className="font-montserrat font-bold text-2xl text-foreground mb-2">
                    Apply to Be a Guest
                  </h3>
                  <p className="font-inter text-base text-muted-foreground">
                    Share your expertise and perspective with our youth audience. We're looking for inspiring voices across all fields.
                  </p>
                </div>
                <GuestApplicationForm />
              </Card>
            </TabsContent>

            <TabsContent value="volunteer">
              <Card className="p-8 bg-card border-card-border">
                <div className="mb-6">
                  <h3 className="font-montserrat font-bold text-2xl text-foreground mb-2">
                    Volunteer With Us
                  </h3>
                  <p className="font-inter text-base text-muted-foreground">
                    Help make Teen Summit 2.0 a success. We need passionate individuals to support production, mentorship, and community engagement.
                  </p>
                </div>
                <VolunteerApplicationForm />
              </Card>
            </TabsContent>

            <TabsContent value="contact">
              <Card className="p-8 bg-card border-card-border">
                <div className="mb-6">
                  <h3 className="font-montserrat font-bold text-2xl text-foreground mb-2">
                    Contact Us
                  </h3>
                  <p className="font-inter text-base text-muted-foreground">
                    Have questions or want to learn more? We'd love to hear from you.
                  </p>
                </div>
                <ContactFormComponent />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
