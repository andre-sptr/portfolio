import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Github, Linkedin, Instagram, Send, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { motion } from "framer-motion";
import { toast } from "sonner";

const socialLinks = [
  { icon: Github, url: "https://github.com/andre-sptr/", label: "GitHub", hoverColor: "hover:bg-foreground hover:text-background" },
  { icon: Linkedin, url: "https://www.linkedin.com/in/andre-sptr", label: "LinkedIn", hoverColor: "hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5]" },
  { icon: Instagram, url: "https://www.instagram.com/andree.sptrr", label: "Instagram", hoverColor: "hover:bg-gradient-to-br hover:from-[#f09433] hover:to-[#bc1888] hover:text-white hover:border-transparent" },
];

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("https://formsubmit.co/ajax/andresaputra07012019@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...values,
          _template: "table",
          _subject: `New Portfolio Message: ${values.subject}`,
        }),
      });
      if (!response.ok) throw new Error("Failed to send message");
      setIsSuccess(true);
      toast.success("Message sent successfully! I'll get back to you soon.");
      form.reset();
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 px-4 relative overflow-hidden" style={{ background: "var(--surface-0)" }}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass-card p-6 sm:p-8 rounded-2xl border-l-4 border-l-primary">
              <h3 className="text-xl sm:text-2xl font-bold mb-6">Get in Touch</h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href="mailto:andresaputra07012019@gmail.com" className="text-sm sm:text-base font-medium hover:text-primary transition-colors break-all block">
                      andresaputra07012019@gmail.com
                    </a>
                  </div>
                </div>
                <div className="pl-16">
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a href="https://wa.me/6282387025429" target="_blank" rel="noopener noreferrer" className="text-sm sm:text-base font-medium hover:text-primary transition-colors">
                    +62 823 8702 5429
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg sm:text-xl font-bold mb-4">Follow Me</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="lg"
                    className={`rounded-full w-12 h-12 p-0 transition-all duration-300 ${social.hoverColor}`}
                    onClick={() => window.open(social.url, '_blank')}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 sm:p-8 rounded-2xl"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} className="bg-muted/50 border-border focus:border-primary/50 text-base h-11" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" {...field} className="bg-muted/50 border-border focus:border-primary/50 text-base h-11" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="subject" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Project Inquiry" {...field} className="bg-muted/50 border-border focus:border-primary/50 text-base h-11" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell me about your project..." className="min-h-[140px] bg-muted/50 border-border focus:border-primary/50 resize-none text-base" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-base h-12 rounded-xl" disabled={isSubmitting || isSuccess}>
                  {isSubmitting ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending...</>
                  ) : isSuccess ? (
                    <><CheckCircle2 className="mr-2 h-4 w-4" />Sent!</>
                  ) : (
                    <><Send className="mr-2 h-4 w-4" />Send Message</>
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
