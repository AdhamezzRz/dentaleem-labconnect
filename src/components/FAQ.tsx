import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How does verification work?",
      answer: "Labs submit their business license, quality certifications (ISO/DAMAS), and undergo a thorough review by our team. Dentists submit their professional license and clinic documentation. Standard verification takes 2-3 business days, while Gold Certification requires additional proof of international standards and capabilities.",
    },
    {
      question: "How are payments handled?",
      answer: "Dentaleem offers two payment options: Full Payment (with discount) or Split Payment (30% deposit at order, 70% on delivery confirmation). All payments are processed securely through our platform. Labs receive payouts automatically after successful delivery confirmation.",
    },
    {
      question: "Is Dentaleem secure?",
      answer: "Yes. We use bank-level encryption for all transactions, comply with GDPR and HIPAA standards for patient data, store all files on secure cloud infrastructure, and maintain complete audit trails of all activities. Your data and patient information are fully protected.",
    },
    {
      question: "How do split payments work?",
      answer: "With split payments, you pay 30% upfront when creating the case (this secures your order and guarantees the lab starts work). The remaining 70% is automatically charged to your saved card when the dentist confirms successful delivery. This protects both parties and ensures quality work.",
    },
    {
      question: "Can labs receive international cases?",
      answer: "Gold Certified labs can access international cases and work with dentists from multiple countries. Standard Certified labs serve their local markets. All labs can apply for Gold Certification by meeting additional quality standards and international shipping requirements.",
    },
    {
      question: "Who delivers the restorations?",
      answer: "Dentaleem partners with vetted dental couriers who specialize in handling dental prosthetics. Labs can choose from approved courier partners or use their own preferred delivery service. All shipments include real-time tracking and proof of delivery.",
    },
    {
      question: "What happens if there's a remake needed?",
      answer: "Our platform includes a structured remake process. If a restoration doesn't meet specifications, dentists can request a remake through the platform. The system tracks fault determination (lab error vs. dentist error) and manages the remake workflow, including payment adjustments when applicable.",
    },
    {
      question: "How does the design approval process work?",
      answer: "Labs upload 3D designs and preview images directly to the platform. Dentists receive instant notifications, can view the designs in detail, leave comments, and either approve or request changes. All communication is documented in the case timeline for full transparency.",
    },
  ];

  return (
    <section id="faq" className="py-24 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-8 mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about Dentaleem
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-6">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-2xl px-6 data-[state=open]:shadow-lg transition-all"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
