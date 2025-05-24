import React from 'react';
    import { motion } from 'framer-motion';
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { Edit, Trash2, ExternalLink } from 'lucide-react';

    const ProjectList = ({ projects, isLoading, onEdit, onDelete, containerVariants }) => {
      const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
      };

      if (isLoading) {
        return (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
          </div>
        );
      }

      if (projects.length === 0) {
        return (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground text-lg py-10"
          >
            No projects yet. Click "Add New Project" to get started.
          </motion.p>
        );
      }

      return (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map(project => (
            <motion.div key={project.id} variants={itemVariants}>
              <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col glassmorphism border-border/60 hover:border-primary">
                <CardHeader className="p-0 relative">
                  <div className="aspect-[16/10] overflow-hidden rounded-t-lg">
                    <img  src={project.image_url} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src="https://images.unsplash.com/photo-1697256200022-f61abccad430" />
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <CardTitle className="text-xl mb-1 font-semibold">{project.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground line-clamp-3">{project.description}</CardDescription>
                </CardContent>
                <CardFooter className="p-4 border-t border-border/40 flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" onClick={() => onEdit(project)} title="Edit Project">
                      <Edit className="h-4 w-4" /> <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => onDelete(project.id)} title="Delete Project">
                      <Trash2 className="h-4 w-4" /> <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                   <Button variant="ghost" size="sm" asChild>
                    <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="flex items-center text-primary hover:text-primary/80">
                      <ExternalLink className="h-4 w-4 mr-1" /> Visit
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      );
    };

    export default ProjectList;