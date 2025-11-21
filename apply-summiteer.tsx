import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { summiteerApplicationSchema, type SummiteerApplication } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Star, ArrowLeft, FileText, Users, Heart, Lightbulb } from "lucide-react";
import { Link } from "wouter";
import { StaggerContainer, StaggerItem } from "@/components/animations/scroll-reveal";

export default function ApplySummiteerPage() {
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
      surveyWhyJoin: "",
      surveyStandingUp: "",
      surveyIssuePassion: "",
      surveyPodcastVision: "",
      surveyCivicEngagement: "",
      surveyDebateExperience: "",
      surveyDreamInterview: "",
      surveyHandlingDisagreement: "",
      surveyUniqueContribution: "",
      surveyCommitmentPledge: "",
      parentTimeCommitment: "",
      parentSupportAvailability: "",
      parentTransportation: "",
      parentAcademicSupport: "",
      parentCommunicationPreference: "",
      parentEmergencyContact: "",
      parentMedicalInfo: "",
      parentConsent: false,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: SummiteerApplication) => {
      return apiRequest("POST", "/api/summiteer-applications", data);
    },
    onSuccess: () => {
      toast({
        title: "Welcome to the movement!",
        description: "We'll be in touch soon with next steps.",
      });
      form.reset();
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/">
          <Button variant="ghost" className="mb-6" data-testid="link-back-home">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <Card>
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Star className="h-8 w-8 text-primary fill-primary" />
            </div>
            <CardTitle className="font-montserrat text-3xl">Apply to Be a Summiteer</CardTitle>
            <CardDescription className="text-base max-w-2xl mx-auto space-y-3">
              <p className="font-semibold text-primary">This is a competitive selection process.</p>
              <p>
                We're looking for exceptional young leaders who are ready to challenge themselves, argue multiple perspectives, and become part of an elite group of civic changemakers. Only the most dedicated applicants will be chosen to join Teen Summit 2.0.
              </p>
              <p className="text-sm italic">
                Submit your strongest application—limited spots available.
              </p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-8">
                <StaggerContainer className="space-y-8">
                  {/* Student Information */}
                  <StaggerItem>
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b pb-3">
                        <Users className="h-5 w-5 text-primary" />
                        <h4 className="font-montserrat font-bold text-lg text-foreground">
                          Student Information
                        </h4>
                      </div>
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
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email *</FormLabel>
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
                              <FormLabel>Phone *</FormLabel>
                              <FormControl>
                                <Input {...field} type="tel" placeholder="(555) 123-4567" data-testid="input-summiteer-phone" />
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
                                <Input {...field} placeholder="e.g., 16" data-testid="input-summiteer-age" />
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
                              <FormLabel>School *</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Your school name" data-testid="input-summiteer-school" />
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
                              <FormLabel>Grade *</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="e.g., 11" data-testid="input-summiteer-grade" />
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
                      <div className="flex items-center gap-3 border-b pb-3">
                        <Heart className="h-5 w-5 text-accent" />
                        <h4 className="font-montserrat font-bold text-lg text-foreground">
                          Parent/Guardian Information
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="parentName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Parent/Guardian Name *</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Parent/guardian full name" data-testid="input-summiteer-parent-name" />
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

                  {/* Student Survey */}
                  <StaggerItem>
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b pb-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <h4 className="font-montserrat font-bold text-lg text-foreground">
                          Student Application Survey
                        </h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        These questions help us understand your passion, commitment, and unique perspective. Take your time and be authentic.
                      </p>

                      {/* Question 1 */}
                      <FormField
                        control={form.control}
                        name="surveyWhyJoin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold">1. Why do you want to join Teen Summit 2.0? *</FormLabel>
                            <FormDescription className="text-xs">
                              Short answer (50-200 characters) - What excites you most about this opportunity?
                            </FormDescription>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="I want to join Teen Summit 2.0 because..."
                                className="min-h-24 resize-none"
                                maxLength={200}
                                data-testid="textarea-survey-why-join"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Question 2 */}
                      <FormField
                        control={form.control}
                        name="surveyStandingUp"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold">2. Describe a time you stood up for what you believed in, even when it was unpopular. *</FormLabel>
                            <FormDescription className="text-xs">
                              Long answer (100-500 words) - What happened? How did you feel? What did you learn?
                            </FormDescription>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="Share your story of courage and conviction..."
                                className="min-h-40 resize-none"
                                data-testid="textarea-survey-standing-up"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Question 3 */}
                      <FormField
                        control={form.control}
                        name="surveyIssuePassion"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold">3. What social or political issue matters most to you? *</FormLabel>
                            <FormDescription className="text-xs">
                              Short answer (20-150 characters) - Name the issue and why it's important.
                            </FormDescription>
                            <FormControl>
                              <Input {...field} placeholder="The issue that matters most to me is..." maxLength={150} data-testid="input-survey-issue-passion" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Question 4 */}
                      <FormField
                        control={form.control}
                        name="surveyPodcastVision"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold">4. Imagine you're hosting a podcast episode. What topic would you choose and why? *</FormLabel>
                            <FormDescription className="text-xs">
                              Long answer (100-300 words) - Describe your episode concept, target audience, and key message.
                            </FormDescription>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="My podcast episode would explore..."
                                className="min-h-32 resize-none"
                                data-testid="textarea-survey-podcast-vision"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Question 5 */}
                      <FormField
                        control={form.control}
                        name="surveyCivicEngagement"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold">5. What does civic engagement mean to you? *</FormLabel>
                            <FormDescription className="text-xs">
                              Short answer (30-150 characters) - In your own words.
                            </FormDescription>
                            <FormControl>
                              <Input {...field} placeholder="Civic engagement means..." maxLength={150} data-testid="input-survey-civic-engagement" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Question 6 */}
                      <FormField
                        control={form.control}
                        name="surveyDebateExperience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold">6. Describe your experience with debate, public speaking, or persuasive communication. *</FormLabel>
                            <FormDescription className="text-xs">
                              Long answer (100-300 words) - Include formal and informal experiences, skills you've developed, and areas you want to improve.
                            </FormDescription>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="My communication experience includes..."
                                className="min-h-32 resize-none"
                                data-testid="textarea-survey-debate-experience"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Question 7 */}
                      <FormField
                        control={form.control}
                        name="surveyDreamInterview"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold">7. Name a person (living or historical) you'd want to interview and one question you'd ask them. *</FormLabel>
                            <FormDescription className="text-xs">
                              Short answer (30-200 characters) - Who and what would you ask?
                            </FormDescription>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="I would interview [person] and ask..."
                                className="min-h-24 resize-none"
                                maxLength={200}
                                data-testid="textarea-survey-dream-interview"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Question 8 */}
                      <FormField
                        control={form.control}
                        name="surveyHandlingDisagreement"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold">8. How do you handle disagreement with someone who has different views? *</FormLabel>
                            <FormDescription className="text-xs">
                              Long answer (100-250 words) - Share your approach to respectful dialogue and finding common ground.
                            </FormDescription>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="When I disagree with someone..."
                                className="min-h-32 resize-none"
                                data-testid="textarea-survey-handling-disagreement"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Question 9 */}
                      <FormField
                        control={form.control}
                        name="surveyUniqueContribution"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold">9. What special skill or perspective would you bring to the Teen Summit team? *</FormLabel>
                            <FormDescription className="text-xs">
                              Short answer (30-150 characters) - What makes you unique?
                            </FormDescription>
                            <FormControl>
                              <Input {...field} placeholder="I would bring..." maxLength={150} data-testid="input-survey-unique-contribution" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Question 10 */}
                      <FormField
                        control={form.control}
                        name="surveyCommitmentPledge"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold">10. Describe your availability and commitment for this 12-week program (Spring 2026). *</FormLabel>
                            <FormDescription className="text-xs">
                              Long answer (100-250 words) - Can you commit to filming schedules? How does this align with your goals?
                            </FormDescription>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="I understand this is a 12-week commitment and..."
                                className="min-h-32 resize-none"
                                data-testid="textarea-survey-commitment-pledge"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </StaggerItem>

                  {/* Parent Survey & Resources */}
                  <StaggerItem>
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b pb-3">
                        <Lightbulb className="h-5 w-5 text-accent" />
                        <h4 className="font-montserrat font-bold text-lg text-foreground">
                          Parent/Guardian Survey & Commitment
                        </h4>
                      </div>
                      <div className="bg-accent/10 border-l-4 border-accent p-4 rounded-r-md">
                        <p className="font-semibold text-sm mb-2">For Parents/Guardians to Complete:</p>
                        <p className="text-sm text-muted-foreground">
                          Please discuss these questions with your teen and provide honest responses about your family's ability to support their participation in this 12-week program.
                        </p>
                      </div>

                      {/* Parent Question 1 */}
                      <FormField
                        control={form.control}
                        name="parentTimeCommitment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Do you understand this is a 12-week commitment with scheduled filming sessions? *</FormLabel>
                            <FormDescription className="text-xs">
                              Please confirm your understanding and any concerns.
                            </FormDescription>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="Yes, I understand the time commitment..."
                                className="min-h-24 resize-none"
                                data-testid="textarea-parent-time-commitment"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Parent Question 2 */}
                      <FormField
                        control={form.control}
                        name="parentSupportAvailability"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Can you support your teen's participation during filming days? *</FormLabel>
                            <FormDescription className="text-xs">
                              (e.g., attendance, encouragement, flexibility with schedule)
                            </FormDescription>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="I can support my teen by..."
                                className="min-h-24 resize-none"
                                data-testid="textarea-parent-support-availability"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Parent Question 3 */}
                      <FormField
                        control={form.control}
                        name="parentTransportation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>How will your teen get to and from filming sessions? *</FormLabel>
                            <FormDescription className="text-xs">
                              Filming location: University of Illinois Urbana-Champaign campus
                            </FormDescription>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="Transportation arrangements..."
                                className="min-h-24 resize-none"
                                data-testid="textarea-parent-transportation"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Parent Question 4 */}
                      <FormField
                        control={form.control}
                        name="parentAcademicSupport"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Are there any academic accommodations or support your teen may need? *</FormLabel>
                            <FormDescription className="text-xs">
                              (e.g., homework flexibility, scheduling around exams)
                            </FormDescription>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="Academic considerations..."
                                className="min-h-24 resize-none"
                                data-testid="textarea-parent-academic-support"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Parent Question 5 */}
                      <FormField
                        control={form.control}
                        name="parentCommunicationPreference"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>How would you prefer to receive program updates? *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-parent-communication-preference">
                                  <SelectValue placeholder="Select communication method" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="email">Email</SelectItem>
                                <SelectItem value="phone">Phone calls</SelectItem>
                                <SelectItem value="text">Text messages</SelectItem>
                                <SelectItem value="all">All methods</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Parent Question 6 */}
                      <FormField
                        control={form.control}
                        name="parentEmergencyContact"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Emergency Contact Information *</FormLabel>
                            <FormDescription className="text-xs">
                              Name, relationship, phone number (if different from above)
                            </FormDescription>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="Emergency contact: Name, relationship, phone..."
                                className="min-h-24 resize-none"
                                data-testid="textarea-parent-emergency-contact"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Parent Question 7 */}
                      <FormField
                        control={form.control}
                        name="parentMedicalInfo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Medical or Dietary Information (Optional)</FormLabel>
                            <FormDescription className="text-xs">
                              Any allergies, medical conditions, or dietary restrictions we should know about?
                            </FormDescription>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="Medical/dietary information (optional)..."
                                className="min-h-24 resize-none"
                                data-testid="textarea-parent-medical-info"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Parent Consent */}
                      <FormField
                        control={form.control}
                        name="parentConsent"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                data-testid="checkbox-parent-consent"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="font-semibold">
                                Parent/Guardian Consent *
                              </FormLabel>
                              <FormDescription className="text-xs">
                                I consent to my teen's participation in Teen Summit 2.0. I understand this program involves video recording, public broadcast, and time commitment. I agree to support their participation and have reviewed the program requirements.
                              </FormDescription>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </StaggerItem>

                  {/* Program Resources */}
                  <StaggerItem>
                    <div className="bg-muted/50 border border-border rounded-md p-6 space-y-4">
                      <h5 className="font-semibold text-base">Program Resources for Parents</h5>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span><strong>Program Duration:</strong> 12 weeks (Spring 2026 filming, Fall 2026 broadcast)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span><strong>Location:</strong> University of Illinois Urbana-Champaign campus</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span><strong>Compensation:</strong> Students receive payment for participation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span><strong>Academic Credit:</strong> College credit opportunities available through UIUC partnership</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span><strong>Parent Amenities:</strong> Reserved viewing area during tapings, meals and refreshments provided on filming days</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span><strong>Educational Support:</strong> Access to Canvas Learning Platform and curriculum materials</span>
                        </li>
                      </ul>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
