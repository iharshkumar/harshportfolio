import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, Linkedin, Mail, Send, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';

// EmailJS Configuration
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim()
        },
        EMAILJS_PUBLIC_KEY
      );

      toast.success("Message sent! 🚀 I'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/Harsh-7243",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/harsh-kumar-9a10152b7",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Mail,
      label: "srivastavaharsh1108@gmail.com",
      href: "mailto:srivastavaharsh1108@gmail.com",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section id="contact" className="py-12 sm:py-16 px-3 sm:px-4 md:px-6 bg-muted/30 w-full" ref={ref}>
      <div className="container mx-auto max-w-6xl w-full px-2 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glassmorphism mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Let's Connect</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-4">
            Let's Build Together 💫
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Have a project in mind? Let's create something amazing together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8 sm:space-y-12"
          >
            <div className="glassmorphism rounded-2xl p-4 sm:p-6 w-full">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Get in Touch</h3>
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                <div className="relative">
                  <Input
                    placeholder=" "
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className="bg-background/50 peer pt-6"
                    required
                  />
                  <label className="absolute left-3 top-4 text-muted-foreground pointer-events-none transition-all duration-200 peer-focus:text-xs peer-focus:top-2 peer-focus:text-primary peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-2">
                    Your Name
                  </label>
                </div>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder=" "
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="bg-background/50 peer pt-6"
                    required
                  />
                  <label className="absolute left-3 top-4 text-muted-foreground pointer-events-none transition-all duration-200 peer-focus:text-xs peer-focus:top-2 peer-focus:text-primary peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-2">
                    Your Email
                  </label>
                </div>
                <div className="relative">
                  <Input
                    placeholder=" "
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("subject")}
                    onBlur={() => setFocusedField(null)}
                    className="bg-background/50 peer pt-6"
                    required
                  />
                  <label className="absolute left-3 top-4 text-muted-foreground pointer-events-none transition-all duration-200 peer-focus:text-xs peer-focus:top-2 peer-focus:text-primary peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-2">
                    Subject
                  </label>
                </div>
                <div className="relative">
                  <Textarea
                    placeholder=" "
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    className="bg-background/50 min-h-[150px] peer pt-6"
                    required
                  />
                  <label className="absolute left-3 top-4 text-muted-foreground pointer-events-none transition-all duration-200 peer-focus:text-xs peer-focus:top-2 peer-focus:text-primary peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-2">
                    Your Message
                  </label>
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="w-full group relative overflow-hidden"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent"
                      initial={{ x: isSubmitting ? "0%" : "-100%" }}
                      animate={{ x: isSubmitting ? "100%" : "-100%" }}
                      transition={{ duration: 2, repeat: isSubmitting ? Infinity : 0, ease: "linear" }}
                    />
                    <span className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:rotate-45 transition-all" />
                        </>
                      )}
                    </span>
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8 sm:space-y-12"
          >

            <div className="glassmorphism rounded-2xl p-4 sm:p-6 md:p-8">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Quick Info</h3>
              <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
                  Available for freelance work
                </p>
                <p>⚡ Fast response time</p>
                <p>🌍 Based in India</p>
                <p>💼 Open to opportunities</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
