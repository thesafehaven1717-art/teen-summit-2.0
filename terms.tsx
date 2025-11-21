import { SEO } from "@/components/seo";
import { BackToTop } from "@/components/back-to-top";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function TermsOfUsePage() {
  return (
    <>
      <SEO
        title="Terms of Use - Teen Summit 2.0"
        description="Terms of Use for the Teen Summit 2.0 platform. Please read these terms carefully before using our services."
      />
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="mb-8">
            <Button asChild variant="ghost" data-testid="button-back">
              <Link href="/">← Back to Home</Link>
            </Button>
          </div>

          <article className="prose prose-lg max-w-none">
            <h1 className="font-montserrat font-bold text-4xl md:text-5xl text-foreground mb-4">
              Terms of Use
            </h1>
            <p className="text-muted-foreground mb-8">
              Last Updated: November 19, 2025
            </p>

            <div className="space-y-8 text-foreground">
              <section>
                <h2 className="font-montserrat font-bold text-2xl text-foreground mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="text-base leading-relaxed mb-4">
                  Welcome to Teen Summit 2.0, a civic media platform operated by the University of Illinois Urbana-Champaign ("UIUC", "we", "us", or "our"). By accessing or using our website, mobile applications, or any related services (collectively, the "Platform"), you agree to be bound by these Terms of Use ("Terms").
                </p>
                <p className="text-base leading-relaxed">
                  If you do not agree to these Terms, please do not use the Platform. If you are under 18 years of age, you must have your parent or legal guardian review and agree to these Terms on your behalf.
                </p>
              </section>

              <section>
                <h2 className="font-montserrat font-bold text-2xl text-foreground mb-4">
                  2. Eligibility and Account Registration
                </h2>
                <p className="text-base leading-relaxed mb-4">
                  <strong>Eligibility:</strong> Teen Summit 2.0 is designed for youth participants aged 13-19. To participate as a Summiteer, volunteer, or guest, you must meet our program-specific eligibility requirements.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  <strong>Account Creation:</strong> Cast members, parents, and educators may be required to create accounts to access certain features. You agree to:
                </p>
                <ul className="list-disc pl-8 space-y-2 mb-4">
                  <li>Provide accurate, current, and complete information during registration</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Maintain the security of your password and account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                  <li>Accept responsibility for all activities that occur under your account</li>
                </ul>
              </section>

              <section>
                <h2 className="font-montserrat font-bold text-2xl text-foreground mb-4">
                  3. Program Participation and Commitments
                </h2>
                <p className="text-base leading-relaxed mb-4">
                  <strong>Summiteer Commitment:</strong> Selected Summiteers agree to participate in a 12-week program that includes debate preparation, filming sessions, musicology discussions, and podcast recordings. This is a competitive, selective program requiring dedication and consistent participation.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  <strong>Code of Conduct:</strong> All participants must:
                </p>
                <ul className="list-disc pl-8 space-y-2 mb-4">
                  <li>Engage in respectful, constructive dialogue and debate</li>
                  <li>Refrain from harassment, bullying, or discriminatory behavior</li>
                  <li>Respect intellectual property rights and give proper attribution</li>
                  <li>Maintain confidentiality when required by the program</li>
                  <li>Follow all safety protocols and university policies</li>
                </ul>
              </section>

              <section>
                <h2 className="font-montserrat font-bold text-2xl text-foreground mb-4">
                  4. User Content and Intellectual Property
                </h2>
                <p className="text-base leading-relaxed mb-4">
                  <strong>Your Content:</strong> You retain ownership of content you submit to the Platform (comments, blog posts, etc.). However, by submitting content, you grant UIUC a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, publish, and distribute such content in connection with the Platform and Teen Summit 2.0 program.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  <strong>Episode and Media Rights:</strong> All episodes, videos, podcasts, and media produced as part of Teen Summit 2.0 are owned by UIUC. Participants grant UIUC the right to use their name, likeness, voice, and performance in all media formats for educational, promotional, and archival purposes.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  <strong>Platform Content:</strong> All content on the Platform, including text, graphics, logos, images, audio clips, video clips, and software, is the property of UIUC or its content suppliers and is protected by United States and international copyright laws.
                </p>
              </section>

              <section>
                <h2 className="font-montserrat font-bold text-2xl text-foreground mb-4">
                  5. Prohibited Conduct
                </h2>
                <p className="text-base leading-relaxed mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc pl-8 space-y-2 mb-4">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Post or transmit harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable content</li>
                  <li>Impersonate any person or entity or falsely state or misrepresent your affiliation</li>
                  <li>Interfere with or disrupt the Platform or servers or networks connected to the Platform</li>
                  <li>Attempt to gain unauthorized access to any portion of the Platform</li>
                  <li>Use automated systems (bots, scrapers) to access the Platform without permission</li>
                  <li>Upload viruses or other malicious code</li>
                  <li>Collect or harvest personal information from other users</li>
                </ul>
              </section>

              <section>
                <h2 className="font-montserrat font-bold text-2xl text-foreground mb-4">
                  6. Privacy and Data Protection
                </h2>
                <p className="text-base leading-relaxed mb-4">
                  Your use of the Platform is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our practices regarding the collection, use, and disclosure of your personal information.
                </p>
                <p className="text-base leading-relaxed">
                  As Teen Summit 2.0 serves minors, we comply with the Children's Online Privacy Protection Act (COPPA) and obtain verifiable parental consent before collecting personal information from participants under 13 years of age.
                </p>
              </section>

              <section>
                <h2 className="font-montserrat font-bold text-2xl text-foreground mb-4">
                  7. Disclaimers and Limitation of Liability
                </h2>
                <p className="text-base leading-relaxed mb-4">
                  <strong>AS IS Basis:</strong> THE PLATFORM IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. UIUC MAKES NO WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  <strong>Limitation of Liability:</strong> TO THE MAXIMUM EXTENT PERMITTED BY LAW, UIUC SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
                </p>
                <p className="text-base leading-relaxed">
                  <strong>Educational Context:</strong> Teen Summit 2.0 is an educational program. While we strive to provide valuable experiences, we do not guarantee specific outcomes, skills development, or future opportunities.
                </p>
              </section>

              <section>
                <h2 className="font-montserrat font-bold text-2xl text-foreground mb-4">
                  8. Indemnification
                </h2>
                <p className="text-base leading-relaxed">
                  You agree to indemnify, defend, and hold harmless UIUC, its trustees, officers, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising out of or in any way connected with your access to or use of the Platform, your violation of these Terms, or your violation of any rights of another.
                </p>
              </section>

              <section>
                <h2 className="font-montserrat font-bold text-2xl text-foreground mb-4">
                  9. Termination
                </h2>
                <p className="text-base leading-relaxed mb-4">
                  We reserve the right to suspend or terminate your access to the Platform at any time, with or without notice, for any reason, including but not limited to violation of these Terms or engaging in conduct harmful to other users or the Teen Summit 2.0 community.
                </p>
                <p className="text-base leading-relaxed">
                  Upon termination, all licenses and rights granted to you under these Terms will immediately cease. Sections of these Terms that by their nature should survive termination shall survive, including but not limited to intellectual property provisions, disclaimers, and limitations of liability.
                </p>
              </section>

              <section>
                <h2 className="font-montserrat font-bold text-2xl text-foreground mb-4">
                  10. Modifications to Terms
                </h2>
                <p className="text-base leading-relaxed">
                  We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms on the Platform and updating the "Last Updated" date. Your continued use of the Platform after such modifications constitutes your acceptance of the updated Terms.
                </p>
              </section>

              <section>
                <h2 className="font-montserrat font-bold text-2xl text-foreground mb-4">
                  11. Governing Law and Dispute Resolution
                </h2>
                <p className="text-base leading-relaxed mb-4">
                  These Terms shall be governed by and construed in accordance with the laws of the State of Illinois, without regard to its conflict of law provisions. Any legal action or proceeding arising under these Terms will be brought exclusively in the federal or state courts located in Champaign County, Illinois.
                </p>
                <p className="text-base leading-relaxed">
                  You agree to first attempt to resolve any dispute informally by contacting us. If a dispute is not resolved within 30 days of submission, either party may pursue formal legal remedies.
                </p>
              </section>

              <section>
                <h2 className="font-montserrat font-bold text-2xl text-foreground mb-4">
                  12. Contact Information
                </h2>
                <p className="text-base leading-relaxed mb-4">
                  If you have any questions about these Terms, please contact us:
                </p>
                <div className="bg-muted p-6 rounded-lg">
                  <p className="font-semibold mb-2">Teen Summit 2.0</p>
                  <p className="text-sm">University of Illinois Urbana-Champaign</p>
                  <p className="text-sm">Communiversity Public Media Project</p>
                  <p className="text-sm mt-2">
                    Email:{" "}
                    <a href="mailto:teensummit@illinois.edu" className="text-primary hover:underline">
                      teensummit@illinois.edu
                    </a>
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-montserrat font-bold text-2xl text-foreground mb-4">
                  13. Miscellaneous
                </h2>
                <p className="text-base leading-relaxed mb-4">
                  <strong>Entire Agreement:</strong> These Terms, together with the Privacy Policy, constitute the entire agreement between you and UIUC regarding the use of the Platform.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  <strong>Severability:</strong> If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  <strong>Waiver:</strong> No waiver of any term of these Terms shall be deemed a further or continuing waiver of such term or any other term.
                </p>
                <p className="text-base leading-relaxed">
                  <strong>Assignment:</strong> You may not assign or transfer these Terms without our prior written consent. We may assign our rights and obligations under these Terms without restriction.
                </p>
              </section>

              <div className="mt-12 p-6 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="text-sm text-center">
                  By using Teen Summit 2.0, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
      <BackToTop />
    </>
  );
}
