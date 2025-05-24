
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { Phone, Mail, MessageSquare, Send } from 'lucide-react'; // MessageSquare for WhatsApp, Send for Telegram

    const contactDetails = {
      whatsappNumberLink: "https://wa.me/+233509977126",
      telegramContactLink: "https://t.me/hectorbotsfiles",
      whatsappChannelLink: "https://whatsapp.com/channel/0029Va8YUl50bIdtVMYnYd0E",
      telegramChannelLink: "https://t.me/ciphertech2",
      email: "hector.manuel@example.com", // Placeholder email
      phone: "+233 50 997 7126"
    };

    const ContactPage = () => {
      return (
        <div className="py-12">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold gradient-text">Get In Touch</h1>
            <p className="text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
              I'm always excited to connect and discuss new projects or ideas. Feel free to reach out!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="shadow-xl glassmorphism h-full">
                <CardHeader>
                  <CardTitle className="text-3xl flex items-center">
                    <Mail className="mr-3 h-8 w-8 text-primary" /> Direct Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-lg">
                  <div>
                    <h3 className="font-semibold text-xl mb-1">Email Address</h3>
                    <a href={`mailto:${contactDetails.email}`} className="text-primary hover:underline break-all">
                      {contactDetails.email}
                    </a>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-1">Phone Number</h3>
                    <a href={`tel:${contactDetails.phone.replace(/\s/g, '')}`} className="text-primary hover:underline">
                      {contactDetails.phone}
                    </a>
                  </div>
                  <div className="space-y-3 pt-4">
                    <Button asChild className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white shadow-lg">
                      <a href={contactDetails.whatsappNumberLink} target="_blank" rel="noopener noreferrer">
                        <MessageSquare className="mr-2 h-5 w-5" /> Chat on WhatsApp
                      </a>
                    </Button>
                    <Button asChild className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-lg">
                      <a href={contactDetails.telegramContactLink} target="_blank" rel="noopener noreferrer">
                        <Send className="mr-2 h-5 w-5" /> Message on Telegram
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="shadow-xl glassmorphism h-full">
                <CardHeader>
                  <CardTitle className="text-3xl flex items-center">
                    <Phone className="mr-3 h-8 w-8 text-accent" /> Join My Channels
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-lg">
                  <p className="text-muted-foreground">Stay updated with my latest projects and announcements by joining my channels:</p>
                  <div className="space-y-3">
                    <Button asChild className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white shadow-lg">
                      <a href={contactDetails.whatsappChannelLink} target="_blank" rel="noopener noreferrer">
                        <MessageSquare className="mr-2 h-5 w-5" /> WhatsApp Channel
                      </a>
                    </Button>
                    <Button asChild className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-lg">
                      <a href={contactDetails.telegramChannelLink} target="_blank" rel="noopener noreferrer">
                        <Send className="mr-2 h-5 w-5" /> Telegram Channel
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      );
    };

    export default ContactPage;
  