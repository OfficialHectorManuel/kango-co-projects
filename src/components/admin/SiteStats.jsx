import React from 'react';
    import { motion } from 'framer-motion';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

    const SiteStats = ({ visitorCount, isLoadingVisitors, containerVariants, Icon }) => {
      return (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <Card className="shadow-lg glassmorphism">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gradient-text">
                {Icon && <Icon className="mr-3 h-7 w-7" />} Site Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingVisitors ? (
                <div className="h-8 bg-muted/50 rounded animate-pulse w-1/2"></div>
              ) : (
                <p className="text-3xl font-semibold">{visitorCount.toLocaleString()}</p>
              )}
              <p className="text-sm text-muted-foreground">Total Unique Visitors</p>
            </CardContent>
          </Card>
        </motion.div>
      );
    };

    export default SiteStats;