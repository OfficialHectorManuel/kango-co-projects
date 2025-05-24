import React, { useState, useEffect } from 'react';
    import { useParams, Link, useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
    import { ArrowLeft, ExternalLink } from 'lucide-react';
    import { supabase } from '@/lib/supabaseClient';

    const ProjectDetailsPage = () => {
      const { id } = useParams();
      const navigate = useNavigate();
      const [project, setProject] = useState(null);
      const [isLoading, setIsLoading] = useState(true);

      useEffect(() => {
        const fetchProjectDetails = async () => {
          setIsLoading(true);
          const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('id', id)
            .single();

          if (error) {
            console.error('Error fetching project details:', error);
            setProject(null);
          } else {
            setProject(data);
          }
          setIsLoading(false);
        };

        if (id) {
          fetchProjectDetails();
        }
      }, [id]);

      if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div></div>;
      }

      if (!project) {
        return (
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-8">The project you are looking for does not exist or may have been moved.</p>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </div>
        );
      }

      return (
        <div className="py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button variant="outline" onClick={() => navigate(-1)} className="mb-8 group border-primary/50 hover:bg-primary/10 hover:text-primary">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Projects
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="overflow-hidden shadow-2xl glassmorphism border-border/60">
              <CardHeader className="p-0">
                <div className="w-full aspect-[16/9] max-h-[60vh] overflow-hidden rounded-t-lg">
                  <img  src={project.image_url} alt={project.title} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1697256200022-f61abccad430" />
                </div>
              </CardHeader>
              <CardContent className="p-6 md:p-10">
                <CardTitle className="text-4xl md:text-5xl font-bold mb-6 gradient-text-alt">{project.title}</CardTitle>
                <CardDescription className="text-lg md:text-xl text-foreground/90 dark:text-foreground/80 leading-relaxed whitespace-pre-wrap prose dark:prose-invert max-w-none">
                  {project.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="p-6 md:p-8 border-t border-border/40">
                <Button size="lg" asChild className="bg-gradient-to-r from-primary to-blue-700 hover:from-primary/90 hover:to-blue-700/90 text-primary-foreground shadow-lg w-full sm:w-auto py-3 px-8 text-lg">
                  <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                    Visit Project <ExternalLink className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      );
    };

    export default ProjectDetailsPage;