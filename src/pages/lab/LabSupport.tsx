import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle, FileText, DollarSign, Award, Truck, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const LabSupport = () => {
  const guides = [
    {
      icon: FileText,
      title: "How to Receive Your First Case",
      description: "Complete guide to accepting and processing your first order",
      steps: [
        "Ensure your marketplace profile is complete and visible",
        "Wait for a dentist to select your lab and submit a case",
        "You'll receive an instant notification via email and dashboard",
        "Review the case details, files, and requirements",
        "Accept the case and begin your workflow (Design → Production → QC → Delivery)"
      ]
    },
    {
      icon: DollarSign,
      title: "How Payments Work (30/70 Split)",
      description: "Understanding the payment flow and timing",
      steps: [
        "When a dentist places an order, 30% is immediately captured as a deposit",
        "This deposit is held securely and visible in your financials dashboard",
        "Continue working on the case with guaranteed payment security",
        "Once you ship and delivery is confirmed by the dentist, the remaining 70% is automatically released",
        "Funds are transferred to your bank account via weekly payouts"
      ]
    },
    {
      icon: Award,
      title: "How Gold Certification Works",
      description: "Eligibility criteria and benefits of Gold status",
      steps: [
        "Maintain a remake rate below 5% for 3 consecutive months",
        "Achieve an average rating of 4.5+ stars from dentists",
        "Complete at least 50 successful cases on the platform",
        "Provide proof of ISO/DAMAS certification (if available)",
        "Once approved, receive the Gold badge and access to international dentists"
      ]
    },
    {
      icon: Truck,
      title: "How to Set Up Shipping Correctly",
      description: "Configure delivery zones and courier partnerships",
      steps: [
        "Go to Settings → Shipping & Delivery",
        "Enter your lab's pickup address accurately",
        "Select local and/or international shipping options",
        "Choose your preferred courier partner (or use Dentaleem's default)",
        "Set delivery surcharges if needed for distant zones",
        "Update delivery estimates for each material type"
      ]
    }
  ];

  const faqs = [
    {
      question: "How long does verification take?",
      answer: "Our team typically reviews lab applications within 24–48 hours. You'll receive an email notification once your lab is verified and ready to accept cases."
    },
    {
      question: "Can I edit my pricing after setup?",
      answer: "Yes! You can update your pricing, turnaround times, and services offered at any time through your lab settings. Changes take effect immediately."
    },
    {
      question: "What happens if a dentist requests a remake?",
      answer: "If a remake is approved as lab fault, you'll receive the remake request in your dashboard. Complete it at no additional charge to the dentist. If it's dentist fault, the dentist covers the cost."
    },
    {
      question: "How do I invite team members?",
      answer: "Go to Settings → Staff & Permissions. You can invite designers, ceramists, QC managers, and admins. Each role has specific access levels for security."
    },
    {
      question: "Can I pause accepting new cases?",
      answer: "Yes. Go to Settings → Marketplace Visibility and toggle 'Accept New Cases' off. Your existing cases will continue, but dentists won't be able to start new ones until you re-enable it."
    },
    {
      question: "What if I have a technical issue?",
      answer: "Contact our support team via the chat widget, email (support@dentaleem.com), or through your dashboard. We typically respond within 2 hours during business hours."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/lab/dashboard" className="text-2xl font-bold text-primary">Dentaleem</Link>
            <Button variant="outline" asChild>
              <Link to="/lab/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 border-b bg-gradient-to-br from-background via-primary/5 to-accent/10">
        <div className="container mx-auto px-6 text-center">
          <HelpCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-5xl font-bold text-foreground mb-4">Lab Help & Support</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know to succeed on Dentaleem
          </p>
        </div>
      </section>

      {/* Quick Guides */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Quick Start Guides</h2>
            <p className="text-lg text-muted-foreground">Step-by-step instructions for common tasks</p>
          </div>

          <div className="max-w-5xl mx-auto space-y-6">
            {guides.map((guide, idx) => {
              const Icon = guide.icon;
              return (
                <Card key={idx} className="border-2">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{guide.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{guide.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-3 ml-16">
                      {guide.steps.map((step, stepIdx) => (
                        <li key={stepIdx} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-bold">
                            {stepIdx + 1}
                          </span>
                          <span className="text-foreground pt-0.5">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">Find answers to common questions</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border rounded-lg bg-card px-6">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <Card className="border-2 border-primary/20 bg-primary/5">
              <CardContent className="p-8 text-center space-y-6">
                <MessageCircle className="h-12 w-12 text-primary mx-auto" />
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Still Need Help?</h3>
                  <p className="text-muted-foreground">
                    Our support team is here to assist you with any questions or issues
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <a href="mailto:support@dentaleem.com">Email Support</a>
                  </Button>
                  <Button size="lg" variant="outline">
                    Live Chat
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Average response time: 2 hours • Available Mon-Fri, 9 AM - 6 PM
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LabSupport;
