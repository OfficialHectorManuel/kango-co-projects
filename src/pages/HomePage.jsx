import React, { useState, useEffect } from 'react';
    import { Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { ArrowRight, Eye } from 'lucide-react';
    import { supabase } from '@/lib/supabaseClient';

    const HomePage = () => {
      const [projects, setProjects] = useState([]);
      const [isLoading, setIsLoading] = useState(true);

      useEffect(() => {
        const fetchProjects = async () => {
          setIsLoading(true);
          const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

          if (error) {
            console.error('Error fetching projects:', error);
            setProjects([]);
          } else {
            setProjects(data);
          }
          setIsLoading(false);
        };

        fetchProjects();
      }, []);

      const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
          },
        },
      };

      const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: {
            type: 'spring',
            stiffness: 100,
          },
        },
      };

      return (
        <div className="space-y-12">
          <motion.section
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center py-16 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 opacity-5 dark:opacity-10" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}></div>
            <h1 className="text-5xl md:text-7xl font-orbitron font-bold mb-6 relative">
              Welcome to <span className="gradient-text-alt">KANGO & CO</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto relative">
              Discover extraordinary projects crafted with passion and precision. Explore the innovation.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Button size="lg" asChild className="bg-gradient-to-r from-primary to-blue-700 hover:from-primary/90 hover:to-blue-700/90 text-primary-foreground shadow-xl py-3 px-8 text-lg">
                <Link to="#projects">
                  Explore Projects <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.section>

          <motion.section
            id="projects"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-center mb-12">My Projects</h2>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : projects.length === 0 ? (
              <p className="text-center text-muted-foreground text-lg">No projects available yet. Stay tuned!</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <motion.div key={project.id} variants={itemVariants}>
                    <Card className="overflow-hidden h-full flex flex-col shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 glassmorphism border-border/60 hover:border-primary">
                      <CardHeader className="p-0">
                        <div className="aspect-[16/10] overflow-hidden rounded-t-lg">
                          <img  src={project.image_url} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" src="https://images.unsplash.com/photo-1697256200022-f61abccad430" />
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 flex-grow">
                        <CardTitle className="text-2xl mb-2 font-semibold">{project.title}</CardTitle>
                        <CardDescription className="text-muted-foreground line-clamp-3">{project.description}</CardDescription>
                      </CardContent>
                      <CardFooter className="p-6 border-t border-border/40">
                        <Button asChild variant="outline" className="w-full group border-primary/50 hover:bg-primary/10 hover:text-primary transition-all duration-300">
                          <Link to={`/project/${project.id}`} className="flex items-center justify-center">
                            View Details <Eye className="ml-2 h-4 w-4 group-hover:animate-pulse text-primary" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>
        </div>
      );
    };

    export default HomePage;