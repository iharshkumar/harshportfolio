import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { ArrowRight, Calendar, Eye, Download, X } from 'lucide-react';
import './ui/flip-card.css';

const CertificationCard = ({
  title,
  issuer,
  date,
  skills,
  link,
  image,
  alt,
  onPreview,
}) => {
  const [isFlipped, setIsFlipped] = React.useState(false);

  const handleViewCertificate = (e) => {
    e.stopPropagation();
    if (onPreview) {
      onPreview();
    } else {
      window.open(link, '_blank');
    }
  };

  const handleDownloadCertificate = (e) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = image;
    link.download = `${title.replace(/\s+/g, '_')}_Certificate.jpg`;
    link.click();
  };

  return (
    <div
      className="flip-card aspect-[3/2] w-full h-full cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped((prev) => !prev)}
    >
      <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
        {/* Front Side - Just the certificate image */}
        <div className="flip-card-front">
          <img 
            src={image} 
            alt={alt} 
            className="w-full h-full object-cover rounded-lg"
            loading="lazy"
          />
        </div>
        
        {/* Back Side - Details */}
        <div className="flip-card-back">
          <div className="flex flex-col h-full p-6">
            {/* Course Name */}
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            
            {/* Institute */}
            <p className="text-sm mb-4 opacity-80">{issuer}</p>
            
            {/* Duration */}
            <div className="flex items-center text-sm mb-6 opacity-80">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{date}</span>
            </div>
            
            {/* Skills */}
            <div className="flex-1">
              <h4 className="text-sm font-medium mb-3 opacity-80">Skills Gained:</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 text-xs font-medium rounded-full 
                      bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200
                      border border-blue-200 dark:border-blue-800/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleViewCertificate}
                className="flex items-center justify-center gap-2 flex-1 px-3 py-2 
                  bg-blue-600 hover:bg-blue-700 text-white rounded-lg 
                  transition-colors duration-200 font-medium text-sm"
                title="Preview Certificate"
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
              <button
                onClick={handleDownloadCertificate}
                className="flex items-center justify-center gap-2 flex-1 px-3 py-2 
                  bg-green-600 hover:bg-green-700 text-white rounded-lg 
                  transition-colors duration-200 font-medium text-sm"
                title="Download Certificate"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const certifications = [
    {
      title: "Cybersecurity Specialization",
      issuer: "Coursera",
      date: "2025",
      skills: ["Malware Protection", "Cloud Security", "Mobile Security", "Incident Management", "Security Strategy"],
      link: "/images/certifications/Coursera_me.jpeg",
      image: "/images/certifications/Coursera_me.jpeg",
      alt: "Coursera Cybersecurity Certification",
      description: "Specialization covering comprehensive cybersecurity topics including mobile security (Android & iOS), cloud security, malware protection, and security incident management."
    },
    {
      title: "Web Development Bootcamp",
      issuer: "ExcelR Solutions",
      date: "April - May 2025",
      skills: ["HTML5", "CSS3", "JavaScript", "ReactJS", "Responsive Design", "REST APIs"],
      link: "/images/certifications/EXCELR_me.jpg",
      image: "/images/certifications/EXCELR_me.jpg",
      alt: "ExcelR Web Development Certification",
      description: "10-day intensive program covering responsive design, CSS Flexbox/Grid, JavaScript fundamentals, DOM manipulation, ReactJS components, state management, and API integration with Axios."
    },
    {
      title: "Advanced Technology Foundation",
      issuer: "ALGO University",
      date: "2025",
      skills: ["Data Structures", "Algorithms"],
      link: "/images/certifications/ATF_me.png",
      image: "/images/certifications/ATF_me.png",
      alt: "ALGO University Advanced Technology Foundation Certification",
      description: "Prestigious program recognizing top talent in advanced technologies. Selected among top candidates nationwide, demonstrating strong potential in emerging tech fields."
    },
    {
      title: "Python Programming",
      issuer: "Infosys Springboard",
      date: "2024",
      skills: ["Python", "Programming Fundamentals", "Data Structures", "Algorithms"],
      link: "/images/certifications/Infosys springboard_me.jpg",
      image: "/images/certifications/Infosys springboard_me.jpg",
      alt: "Infosys Springboard Python Programming Certification",
      description: "Comprehensive Python programming course covering from basic to advanced concepts, focusing on practical implementation and problem-solving skills."
    },
    {
      title: "Cybersecurity Professional",
      issuer: "Palo Alto Networks",
      date: "2023",
      skills: ["Network Security", "Threat Prevention", "Cloud Security", "Endpoint Protection"],
      link: "/images/certifications/palo_alto_me.jpg",
      image: "/images/certifications/palo_alto_me.jpg",
      alt: "Palo Alto Networks Cybersecurity Certification",
      description: "Professional certification in enterprise-grade cybersecurity practices and threat prevention strategies."
    },
    
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="certifications" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
            My Achievements
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Certifications
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-10 rounded-full"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2 sm:px-4">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full w-full min-h-[240px] sm:min-h-[300px] lg:min-h-[400px]"
            >
              <div className="h-full w-full">
                <CertificationCard 
                  {...cert} 
                  onPreview={() => setSelectedCertificate(cert)}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certificate Preview Modal */}
        <AnimatePresence>
          {selectedCertificate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedCertificate(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl w-full max-h-[90vh] bg-background rounded-xl shadow-2xl border border-border/50 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-background/90 to-transparent z-10 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {selectedCertificate.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedCertificate.issuer} • {selectedCertificate.date}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedCertificate(null)}
                    className="p-2 rounded-full hover:bg-muted transition-colors text-foreground/70 hover:text-foreground"
                    aria-label="Close preview"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="h-full w-full p-4 pt-16 pb-6 overflow-hidden flex items-center justify-center">
                  <img
                    src={selectedCertificate.image}
                    alt={selectedCertificate.alt}
                    className="block w-auto max-w-full max-h-[80vh] md:max-h-[85vh] object-contain rounded-lg shadow-lg"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Certifications;
