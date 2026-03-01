import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ExternalLink, Github, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        // Fetch more repos from GitHub (up to 30 to get a good selection)
        const response = await fetch('https://api.github.com/users/iharshkumar/repos?sort=updated&per_page=30');
        const data = await response.json();

        // Filter out forks if needed, and ensure we have valid repos
        const validRepos = data.filter(repo => repo && !repo.fork);

        // Sort repos: projects with live demo (homepage) first, then by stars, then by updated date
        const sortedRepos = validRepos.sort((a, b) => {
          // Priority 1: Projects with homepage (live demo) come first
          if (a.homepage && !b.homepage) return -1;
          if (!a.homepage && b.homepage) return 1;

          // Priority 2: If both have or both don't have homepage, sort by stars
          if (a.stargazers_count !== b.stargazers_count) {
            return b.stargazers_count - a.stargazers_count;
          }

          // Priority 3: If stars are equal, maintain updated date order (newest first)
          return new Date(b.updated_at) - new Date(a.updated_at);
        });

        // Take only the top 6 projects for display
        setRepos(sortedRepos.slice(0, 6));
      } catch (error) {
        console.error('Error fetching repos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-muted/30" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Featured <span className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-16 sm:w-20 h-0.5 sm:h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-4 sm:mb-6" />
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2 sm:px-4">
            A showcase of my recent work from GitHub
          </p>
        </motion.div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="glassmorphism rounded-xl h-64" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 px-2 sm:px-0">
            {repos.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{
                  duration: 0.4,
                  delay: Math.min(index * 0.1, 0.4),
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: {
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1]
                  }
                }}
              >
                <Card className="h-full glassmorphism border-border/50 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/20">
                  <CardHeader className="pb-3 px-4 sm:px-6 pt-4 sm:pt-5">
                    <CardTitle className="flex items-center justify-between gap-3">
                      <span className="truncate text-[15px] sm:text-base font-medium">{repo.name}</span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0 bg-muted/50 rounded-full px-2 py-1">
                        <Star className="w-3 h-3" />
                        <span className="text-xs">{repo.stargazers_count}</span>
                      </div>
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-[13px] sm:text-sm text-muted-foreground mt-1">
                      {repo.description || "No description available"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3 px-4 sm:px-6">
                    <div className="flex flex-wrap gap-1.5">
                      {repo.language && (
                        <Badge variant="secondary" className="text-[11px] px-1.5 py-0.5">{repo.language}</Badge>
                      )}
                      {repo.topics.slice(0, 2).map((topic) => (
                        <Badge key={topic} variant="outline" className="text-[11px] px-1.5 py-0.5">
                          {topic.length > 10 ? `${topic.substring(0, 10)}...` : topic}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="gap-2 flex sm:flex-row pt-2 pb-4 sm:pb-5 px-4 sm:px-6">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="flex-1 w-full text-xs h-9 sm:h-9"
                    >
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                        <Github className="w-3.5 h-3.5 mr-1.5" />
                        <span>Code</span>
                      </a>
                    </Button>
                    {repo.homepage && (
                      <Button
                        size="sm"
                        asChild
                        className="flex-1 w-full text-xs h-9 sm:h-9"
                      >
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center"
                        >
                          <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                          <span>Demo</span>
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-10 sm:mt-12 px-2"
        >
          <Button
            size="lg"
            variant="outline"
            asChild
            className="rounded-full w-full sm:w-auto h-11 sm:h-12 text-sm sm:text-base"
          >
            <a
              href="https://github.com/iharshkumar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-6"
            >
              <Github className="w-4 h-4 mr-2" />
              View All Projects
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
