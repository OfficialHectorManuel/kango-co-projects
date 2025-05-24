import React, { useState, useEffect } from 'react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Textarea } from '@/components/ui/textarea'; 
    import { Label } from '@/components/ui/label';
    import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
    import { useToast } from '@/components/ui/use-toast';
    import { supabase } from '@/lib/supabaseClient';

    const ProjectFormModal = ({ isOpen, onClose, currentProject, onProjectSaved, userId }) => {
      const [formData, setFormData] = useState({ title: '', description: '', image_url: '', project_url: '' });
      const { toast } = useToast();

      useEffect(() => {
        if (currentProject) {
          setFormData({ 
            title: currentProject.title, 
            description: currentProject.description, 
            image_url: currentProject.image_url, 
            project_url: currentProject.project_url 
          });
        } else {
          setFormData({ title: '', description: '', image_url: '', project_url: '' });
        }
      }, [currentProject]);

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.description || !formData.image_url || !formData.project_url) {
          toast({ title: "Error", description: "All fields are required.", variant: "destructive" });
          return;
        }

        if (!userId) {
          toast({ title: "Error", description: "User not authenticated. Cannot save project.", variant: "destructive" });
          return;
        }
        
        let query;
        let successMessage;

        const projectData = { ...formData, user_id: userId };

        if (currentProject) { 
          query = supabase.from('projects').update(projectData).eq('id', currentProject.id);
          successMessage = "Project updated successfully.";
        } else { 
          query = supabase.from('projects').insert([projectData]);
          successMessage = "Project added successfully.";
        }
        
        const { error } = await query;

        if (error) {
          console.error("Error saving project:", error);
          toast({ title: "Error", description: `Could not save project: ${error.message}`, variant: "destructive" });
        } else {
          toast({ title: "Success", description: successMessage });
          onProjectSaved();
        }
      };

      return (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-[525px] glassmorphism border-border/60">
            <DialogHeader>
              <DialogTitle className="text-2xl gradient-text">{currentProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
              <DialogDescription>
                {currentProject ? 'Update the details of your project.' : 'Fill in the details for your new project.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right col-span-1">Title</Label>
                <Input id="title" name="title" value={formData.title} onChange={handleInputChange} className="col-span-3 bg-background/70 border-border/50 focus:border-primary" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right col-span-1">Description</Label>
                <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} className="col-span-3 bg-background/70 border-border/50 focus:border-primary" rows={3}/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image_url" className="text-right col-span-1">Image URL</Label>
                <Input id="image_url" name="image_url" type="url" value={formData.image_url} onChange={handleInputChange} className="col-span-3 bg-background/70 border-border/50 focus:border-primary" placeholder="https://example.com/image.jpg"/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="project_url" className="text-right col-span-1">Project URL</Label>
                <Input id="project_url" name="project_url" type="url" value={formData.project_url} onChange={handleInputChange} className="col-span-3 bg-background/70 border-border/50 focus:border-primary" placeholder="https://example.com/project-live-link"/>
              </div>
              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" className="bg-gradient-to-r from-primary to-blue-700 hover:from-primary/90 hover:to-blue-700/90 text-primary-foreground shadow-lg">
                  {currentProject ? 'Save Changes' : 'Add Project'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      );
    };
    export default ProjectFormModal;