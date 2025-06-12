
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRight, Award, CalendarClock, Cpu, Leaf, Repeat, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const whyUsFeatures = [
    {
      icon: <Cpu className="h-10 w-10 text-accent mb-4" />,
      title: "AI-Personalised Pathways",
      description: "AI-driven lessons help students learn 2× more in half the time compared with static modules.",
    },
    {
      icon: <Repeat className="h-10 w-10 text-accent mb-4" />,
      title: "Retrieval-Practice Engine",
      description: "Regular low-stakes testing boosts long-term retention better than re-reading— the classic testing effect.",
    },
    {
      icon: <CalendarClock className="h-10 w-10 text-accent mb-4" />,
      title: "Spaced-Repetition Scheduler",
      description: "Algorithmic spacing is up to 89 % more effective than cramming.",
    },
    {
      icon: <SlidersHorizontal className="h-10 w-10 text-accent mb-4" />,
      title: "Adaptive Testing",
      description: "Difficulty adjusts in real time, lowering test anxiety and drop-out by double-digit margins.",
    },
    {
      icon: <Award className="h-10 w-10 text-accent mb-4" />,
      title: "Expert-Built Content",
      description: "Created by 99ᵗʰ-percentile tutors and mapped to 2024 UCAT averages.",
    },
    {
      icon: <Leaf className="h-10 w-10 text-accent mb-4" />,
      title: "Purpose-Led Mission",
      description: "Every licence funds free masterclasses for rural schools.",
    },
  ];

  const howItWorksSteps = [
    { title: "Assess", description: "A 30-min diagnostic benchmarks you against the latest UCAT deciles." },
    { title: "Adapt", description: "AI serves questions in your personal “Goldilocks zone,” stretching skills without overwhelm." },
    { title: "Accelerate", description: "Spaced reminders keep you on track; instant feedback lifts engagement 25 % on average." },
  ];

  const successStories = [
    { quote: "MedWithPurpose pushed my VR percentile from 55ᵗʰ to 90ᵗʰ in five weeks.", author: "Aisha ’24" },
    { quote: "The adaptive mocks felt tougher than the real exam—exactly what I needed.", author: "Ethan ’24" },
  ];

  const pricingTiers = [
    { plan: "Starter (Free)", price: "$0", perks: "Diagnostic, 50 Qs, MedWithPurpose progress tracker" },
    { plan: "Pro", price: "$29 / month", perks: "Full banks, 5 mocks, AI coach" },
    { plan: "Elite", price: "$59 / month", perks: "Everything in Pro + 1-on-1 tutor calls" },
  ];

  const faqs = [
    { question: "Is MedWithPurpose content up-to-date?", answer: "Yes—our question writers refresh banks annually using the newest UCAT specifications and statistics." },
    { question: "Will AI shortcuts hurt real learning?", answer: "No. Adaptive retrieval and spacing deepen mastery; dozens of peer-reviewed studies back the approach." },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      {/* HERO SECTION */}
      <section id="hero" className="text-center py-20 md:py-32 relative overflow-hidden min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center">
        <Image
          src="https://ik.imagekit.io/mwp/MWP%20Platform%20Design%20Images/web_frontpage_banner"
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          className="-z-10 opacity-60"
          priority
          data-ai-hint="abstract background"
        />
        <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[150%] bg-gradient-radial from-primary/20 via-transparent to-transparent blur-3xl animate-pulse opacity-70"></div>
          <div className="absolute bottom-0 left-1/3 -translate-x-1/2 w-[100%] h-[100%] bg-gradient-radial from-accent/10 via-transparent to-transparent blur-2xl animate-pulse opacity-50"></div>
        </div>
        <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
          Welcome To <span className="bg-gradient-to-r from-primary via-secondary to-accent text-transparent bg-clip-text">MedWithPurpose</span>
          <span className="block text-2xl md:text-3xl lg:text-4xl font-semibold mt-3 text-muted-foreground">
            Smarter UCAT prep, for future doctors.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
          Personalised AI, 3000+ exam-authentic drills and real-time analytics—everything you need to stride into test day certain, not hopeful.
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row items-center">
          <Button
            size="lg"
            asChild
            className="bg-gradient-to-r from-primary via-secondary to-accent text-primary-foreground hover:shadow-lg hover:shadow-primary/40 transition-all duration-300 transform hover:scale-105 px-8 py-3 w-full sm:w-auto"
          >
            <Link href="/auth/signup">Start my free trial</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-primary/50 hover:bg-primary/10 hover:text-primary transition-all duration-300 transform hover:scale-105 text-foreground hover:border-primary px-8 py-3 w-full sm:w-auto"
          >
            <Link href="/#why-us">Explore MedWithPurpose Courses</Link>
          </Button>
        </div>
      </section>

      {/* WHY MEDWITHPURPOSE? SECTION */}
      <section id="why-us" className="py-16 md:py-24">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-16">
          Why <span className="bg-gradient-to-r from-primary via-secondary to-accent text-transparent bg-clip-text">MedWithPurpose</span>?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyUsFeatures.map((feature, index) => (
            <Card key={index} className="group bg-card/70 backdrop-blur-md border-border/30 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col overflow-hidden">
              <CardHeader className="items-center text-center p-6">
                {feature.icon}
                <CardTitle className="font-headline text-xl mt-2">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col items-center text-center p-6 pt-0">
                <p className="text-base text-muted-foreground mb-2 flex-grow">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild className="border-primary/50 hover:bg-primary/10 hover:text-primary">
            <Link href="/#success-stories">See Why Students Choose MedWithPurpose</Link>
          </Button>
        </div>
      </section>

      {/* HOW MEDWITHPURPOSE WORKS SECTION */}
      <section id="how-it-works" className="py-16 md:py-24 bg-muted/50 rounded-lg">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">
          How <span className="bg-gradient-to-r from-primary via-secondary to-accent text-transparent bg-clip-text">MedWithPurpose</span> Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8 container mx-auto px-4">
          {howItWorksSteps.map((step, index) => (
            <div key={index} className="text-center p-6 bg-card rounded-lg shadow-lg">
              <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                {index + 1}
              </div>
              <h3 className="font-headline text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground mb-1">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button size="lg" asChild className="bg-gradient-to-r from-primary via-secondary to-accent text-primary-foreground hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <Link href="/auth/signup">Run my free diagnostic mock</Link>
          </Button>
        </div>
      </section>

      {/* SUCCESS STORIES SECTION */}
      <section id="success-stories" className="py-16 md:py-24">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">
          Success <span className="bg-gradient-to-r from-primary via-secondary to-accent text-transparent bg-clip-text">Stories</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {successStories.map((story, index) => (
            <Card key={index} className="p-6 bg-card shadow-xl">
              <CardContent className="pt-0">
                <blockquote className="text-lg text-foreground italic border-l-4 border-primary pl-4">
                  "{story.quote}"
                </blockquote>
                <p className="text-right mt-4 font-semibold text-muted-foreground">- {story.author}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild className="border-primary/50 hover:bg-primary/10 hover:text-primary">
            <Link href="/auth/signup">Browse More MedWithPurpose Wins</Link>
          </Button>
        </div>
      </section>

      {/* OUR STORY & VALUES SECTION / IMPACT */}
      <section id="impact" className="py-16 md:py-24 bg-muted/50 rounded-lg">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-6">
            Our Story & <span className="bg-gradient-to-r from-primary via-secondary to-accent text-transparent bg-clip-text">Values</span>
          </h2>
          <p className="text-lg text-foreground leading-relaxed">
            At MedWithPurpose we believe access + evidence = impact. Our founders merged frontline medical experience with cutting-edge learning science to level the playing field for every aspiring doctor. Brand storytelling builds emotional resonance and lifts brand favourability—no competitor can copy your narrative.
          </p>
        </div>
      </section>

      {/* PRICING SNAPSHOT SECTION */}
      <section id="pricing" className="py-16 md:py-24">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">
          Pricing <span className="bg-gradient-to-r from-primary via-secondary to-accent text-transparent bg-clip-text">Snapshot</span>
        </h2>
        <Card className="max-w-3xl mx-auto shadow-xl">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-headline text-lg">Plan</TableHead>
                  <TableHead className="font-headline text-lg">Price (AUD)</TableHead>
                  <TableHead className="font-headline text-lg">Key perks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pricingTiers.map((tier, index) => (
                  <TableRow key={index} className={index === 1 ? "bg-primary/10" : ""}>
                    <TableCell className="font-medium">{tier.plan}</TableCell>
                    <TableCell>{tier.price}</TableCell>
                    <TableCell>{tier.perks}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <p className="text-center text-muted-foreground mt-6">14-day money-back promise—risk-free.</p>
        <div className="text-center mt-8">
          <Button size="lg" asChild className="bg-gradient-to-r from-primary via-secondary to-accent text-primary-foreground hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <Link href="/auth/signup">Try MedWithPurpose Pro For Free</Link>
          </Button>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-16 md:py-24 bg-muted/50 rounded-lg">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">
            Frequently Asked <span className="bg-gradient-to-r from-primary via-secondary to-accent text-transparent bg-clip-text">Questions</span>
          </h2>
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index}>
                <h3 className="font-headline text-xl font-semibold text-foreground mb-2">"{faq.question}"</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <p className="text-xl text-foreground font-semibold mb-6">
              “Join 5000+ Australian candidates who trusted MedWithPurpose for their UCAT journey.”
            </p>
            <Button size="lg" asChild className="bg-gradient-to-r from-primary via-secondary to-accent text-primary-foreground hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <Link href="/auth/signup">
                <span className="inline-flex items-center">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
