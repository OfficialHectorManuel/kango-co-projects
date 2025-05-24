import React, { useState, useEffect, useCallback } from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { useToast } from '@/components/ui/use-toast';
    import { PlusCircle, Users } from 'lucide-react';
    import { supabase } from '@/lib/supabaseClient';
    import { useAuth } from '@/contexts/AuthContext';
    import ProjectList from '@/components/admin/ProjectList';
    import ProjectFormModal from '@/components/admin/ProjectFormModal';
    import SiteStats from '@/components/admin/SiteStats';

    const AdminDashboardPage = () => {
      const [projects, setProjects] = useState([]);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [currentProject, setCurrentProject] = useState(null);
      const [isLoadingProjects, setIsLoadingProjects] = useState(true);
      const [visitorCount, setVisitorCount] = useState(0);
      const [isLoadingVisitors, setIsLoadingVisitors] = useState(true);
      
      const { toast } = useToast();
      const { user } = useAuth();

      const fetchProjects = useCallback(async () => {
        setIsLoadingProjects(true);
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching projects:', error);
          toast({ title: "Error", description: "Could not fetch projects.", variant: "destructive" });
          setProjects([]);
        } else {
          setProjects(data);
        }
        setIsLoadingProjects(false);
      }, [toast]);

      const fetchVisitorCount = useCallback(async () => {
        setIsLoadingVisitors(true);
        const { error, count } = await supabase
          .from('site_visits')
          .select('*', { count: 'exact', head: true });

        if (error) {
          console.error('Error fetching visitor count:', error);
          toast({ title: "Error", description: "Could not fetch visitor count.", variant: "destructive" });
          setVisitorCount(0);
        } else {
          setVisitorCount(count || 0);
        }
        setIsLoadingVisitors(false);
      }, [toast]);

      useEffect(() => {
        if (user) {
          fetchProjects();
          fetchVisitorCount();
        }
      }, [user, fetchProjects, fetchVisitorCount]);

      const openModalForCreate = () => {
        setCurrentProject(null);
        setIsModalOpen(true);
      };

      const openModalForEdit = (project) => {
        setCurrentProject(project);
        setIsModalOpen(true);
      };

      const closeModal = () => {
        setIsModalOpen(false);
        setCurrentProject(null);
      };

      const handleProjectSaved = () => {
        fetchProjects();
        closeModal();
      };

      const handleDeleteProject = async (projectId) => {
        const { error } = await supabase.from('projects').delete().eq('id', projectId);
        if (error) {
          toast({ title: "Error", description: `Could not delete project: ${error.message}`, variant: "destructive" });
        } else {
          toast({ title: "Success", description: "Project deleted successfully." });
          fetchProjects();
        }
      };
      
      const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
      };

      return (
        <div className="py-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-between items-center mb-8 gap-4"
          >
            <h1 className="text-4xl font-bold gradient-text-alt">Admin Dashboard</h1>
            <Button onClick={openModalForCreate} className="bg-gradient-to-r from-primary to-blue-700 hover:from-primary/90 hover:to-blue-700/90 text-primary-foreground shadow-lg">
              <PlusCircle className="mr-2 h-5 w-5" /> Add New Project
            </Button>
          </motion.div>

          <SiteStats 
            visitorCount={visitorCount} 
            isLoadingVisitors={isLoadingVisitors} 
            containerVariants={containerVariants}
            Icon={Users}
          />
          
          <ProjectList
            projects={projects}
            isLoading={isLoadingProjects}
            onEdit={openModalForEdit}
            onDelete={handleDeleteProject}
            containerVariants={containerVariants}
          />

          {isModalOpen && (
            <ProjectFormModal
              isOpen={isModalOpen}
              onClose={closeModal}
              currentProject={currentProject}
              onProjectSaved={handleProjectSaved}
              userId={user?.id}
            />
          )}
        </div>
      );
    };

    export default AdminDashboardPage;