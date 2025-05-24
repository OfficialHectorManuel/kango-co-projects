import React from 'react';
    import { motion } from 'framer-motion';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { Coins as HandCoins, Copy, ExternalLink } from 'lucide-react';
    import { useToast } from "@/components/ui/use-toast";

    const supportDetails = [
      {
        method: "Mobile Money (MTN)",
        detail: "0257767765",
        icon: <img  alt="MTN Mobile Money Logo" class="h-6 w-6 mr-2" src="https://images.unsplash.com/photo-1608286022625-bc07f7a21154" />,
        actionType: "copy"
      },
      {
        method: "Telecel Cash",
        detail: "0509977126",
        icon: <img  alt="Telecel Cash Logo" class="h-6 w-6 mr-2" src="https://images.unsplash.com/photo-1608286022625-bc07f7a21154" />,
        actionType: "copy"
      },
      {
        method: "Binance ID",
        detail: "762761682",
        icon: <img  alt="Binance Logo" class="h-6 w-6 mr-2" src="https://images.unsplash.com/photo-1568092715422-fff34eabbe84" />,
        actionType: "copy"
      },
       {
        method: "Donate via PayPal",
        detail: "Optional: Add PayPal.me link",
        icon: <img  alt="PayPal Logo" class="h-6 w-6 mr-2" src="https://images.unsplash.com/photo-1596843720750-7de9329da5d7" />,
        actionType: "link",
        url: "https://paypal.me/yourusername" // Replace with your actual PayPal.me link if you have one
      }
    ];

    const SupportMePage = () => {
      const { toast } = useToast();

      const handleCopy = (textToCopy, methodName) => {
        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            toast({
              title: "Copied to Clipboard!",
              description: `${methodName} details: ${textToCopy}`,
            });
          })
          .catch(err => {
            console.error('Failed to copy: ', err);
            toast({
              title: "Copy Failed",
              description: "Could not copy details. Please try manually.",
              variant: "destructive",
            });
          });
      };
      
      const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
          },
        },
      };

      const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: {
            type: "spring",
            stiffness: 100,
          },
        },
      };


      return (
        <div className="py-12">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-orbitron font-bold mb-4">
              <span className="gradient-text-alt">Support My Work</span>
            </h1>
            <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
              If you find my projects valuable or inspiring, consider supporting me. Your contribution helps me dedicate more time to creating and sharing innovative solutions.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {supportDetails.map((item, index) => (
              (item.actionType === "link" && item.detail.startsWith("Optional:")) ? null : (
              <motion.div key={index} variants={itemVariants}>
                <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 glassmorphism border-border/60 hover:border-primary h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center">
                      {item.icon ? item.icon : <HandCoins className="mr-3 h-7 w-7 text-primary" />}
                      {item.method}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-lg font-semibold text-foreground/90 dark:text-foreground/80 break-all">{item.detail}</p>
                    {item.actionType === "copy" ? (
                      <Button 
                        variant="outline" 
                        className="w-full group border-primary/50 hover:bg-primary/10"
                        onClick={() => handleCopy(item.detail, item.method)}
                      >
                        <Copy className="mr-2 h-4 w-4 text-primary group-hover:animate-pulse" /> Copy Details
                      </Button>
                    ) : item.actionType === "link" ? (
                       <Button asChild className="w-full bg-gradient-to-r from-primary to-blue-600 text-primary-foreground hover:opacity-90">
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" /> Donate
                        </a>
                      </Button>
                    ) : null}
                  </CardContent>
                </Card>
              </motion.div>
              )
            ))}
          </motion.div>
          
          <motion.div
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.5 + supportDetails.length * 0.1 }}
             className="text-center mt-12"
          >
            <p className="text-lg text-muted-foreground">
                Your support, no matter the size, is greatly appreciated and fuels future development. Thank you!
            </p>
          </motion.div>

        </div>
      );
    };

    export default SupportMePage;