import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Dr. Ahmed Hassan",
      role: "Cosmetic Dentist",
      clinic: "Cairo Smile Center",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop",
      quote: "Dentaleem reduced remake calls by 70% within 3 months. The design approval workflow is a game-changer.",
      rating: 5,
      type: "dentist",
    },
    {
      name: "Dr. Sarah Mohamed",
      role: "Prosthodontist",
      clinic: "Elite Dental Clinic",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop",
      quote: "Finally, a platform that streamlines everything. Real-time tracking and instant messaging save hours every week.",
      rating: 5,
      type: "dentist",
    },
    {
      name: "Dr. Omar Ibrahim",
      role: "General Dentist",
      clinic: "Modern Dental Care",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop",
      quote: "The split payment option and verified lab marketplace give me peace of mind with every case.",
      rating: 5,
      type: "dentist",
    },
    {
      name: "Elite Dental Lab",
      role: "Full-Service Lab",
      clinic: "Cairo, Egypt",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=200&h=200&fit=crop",
      quote: "We gained 42 new dentist clients in the first month. The platform's workflow tools increased our efficiency by 40%.",
      rating: 5,
      type: "lab",
    },
    {
      name: "Precision Prosthetics",
      role: "CAD/CAM Specialists",
      clinic: "Alexandria, Egypt",
      image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=200&h=200&fit=crop",
      quote: "Our remake rate dropped from 22% to under 8%. The design collaboration feature is exceptional.",
      rating: 5,
      type: "lab",
    },
    {
      name: "Modern Smile Lab",
      role: "Digital Dentistry Lab",
      clinic: "Giza, Egypt",
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=200&h=200&fit=crop",
      quote: "Guaranteed deposits and automatic payouts solved our cash flow issues. Highly recommended for labs.",
      rating: 5,
      type: "lab",
    },
  ];

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Trusted by Dentists and Labs
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real feedback from professionals transforming their workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-3xl bg-card border border-border p-8 hover:shadow-xl transition-all duration-300"
            >
              <Quote className="absolute top-6 right-6 h-12 w-12 text-primary/10" />
              
              <div className="relative z-10 space-y-6">
                {/* Rating */}
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-foreground leading-relaxed">{testimonial.quote}</p>

                {/* Profile */}
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.clinic}</p>
                  </div>
                </div>

                {/* Badge */}
                <div className="flex justify-end">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    testimonial.type === "dentist" 
                      ? "bg-primary/10 text-primary" 
                      : "bg-secondary/10 text-secondary"
                  }`}>
                    {testimonial.type === "dentist" ? "Dentist" : "Lab"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
