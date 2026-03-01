import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { GraduationCap, Award, Code2, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileCard from "@/components/ProfileCard";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState('about');

  const education = [
    {
      icon: GraduationCap,
      period: "2023 - 2027",
      degree: "B.E in Computer Science",
      institution: "P.E.S College of Engineering, Mandya"
    },
    {
      icon: Award,
      period: "2023",
      degree: "12th (Senior-secondary)",
      institution: "CBSE Board - 77%"
    },
    {
      icon: Award,
      period: "2021",
      degree: "10th (Secondary)",
      institution: "CBSE Board - 94%"
    }
  ];

  const skills = ["Java", "Python", "Agentic AI", "ReactJs", "NodeJs", "MongoDB", "Problem Solving", "Leadership"];


  return (
    <section id="about" className="py-20 md:py-28 px-4 sm:px-6 bg-background/50 relative overflow-hidden" ref={ref}>
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
            Get To Know Me
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-10 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Text Content */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* About Me Card */}
            <Card className="border-border/50 bg-background/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-primary" />
                  <span>Who Am I?</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-4 mb-4">
                    <button
                      onClick={() => setActiveTab('about')}
                      className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${activeTab === 'about'
                        ? 'bg-primary text-white'
                        : 'text-muted-foreground hover:bg-accent/50'
                        }`}
                    >
                      About
                    </button>
                    <button
                      onClick={() => setActiveTab('education')}
                      className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${activeTab === 'education'
                        ? 'bg-primary text-white'
                        : 'text-muted-foreground hover:bg-accent/50'
                        }`}
                    >
                      Education
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="min-h-[200px]"
                    >
                      {activeTab === 'about' ? (
                        <div className="space-y-4">
                          <p className="text-muted-foreground leading-relaxed">
                            I'm a passionate <span className="text-primary font-medium">Computer Science Engineering</span> student at PES College of Engineering, Mandya, with expertise in Java, Python, and web development. I love transforming complex problems into elegant solutions through code.
                          </p>
                          <p className="text-muted-foreground leading-relaxed">
                            Beyond coding, I'm an avid photographer and creative storyteller, always looking to capture the world through my lens. I believe in the power of technology to create meaningful impact while maintaining a keen eye for aesthetics.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {education.map((edu, index) => (
                            <div key={index} className="flex gap-4">
                              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <GraduationCap className="w-6 h-6 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground">{edu.degree}</h4>
                                <p className="text-sm text-muted-foreground">{edu.institution}</p>
                                <span className="inline-block mt-1 text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                                  {edu.period}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>

            {/* Skills Card */}
            <Card className="border-border/50 bg-background/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <Code2 className="w-6 h-6 text-primary" />
                  <span>Skills & Expertise</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Profile Card */}
          <motion.div
            className="relative h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="sticky top-24">
              <ProfileCard
                image="/images/me.jpeg"
                name="Harsh Kumar"
                title="Developer & Creator"
                location="Bengaluru, India"
                resumePath="/Harsh_Kumar_Resume.pdf"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


export default About;
