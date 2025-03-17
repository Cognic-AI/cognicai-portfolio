"use client"
import { motion } from "framer-motion"
import { ArrowRight, Brain, Cpu, Database, Globe, Mail, MessageSquare, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Sections() {
  const projects = [
    {
      title: "NeuraSense",
      description: "Advanced neural network for real-time sentiment analysis and emotion detection in text and speech.",
      icon: <Brain className="h-10 w-10 text-cognicblue-500" />,
      tags: ["Neural Networks", "NLP", "Emotion AI"],
    },
    {
      title: "CogniVision",
      description: "Computer vision system that identifies objects, people, and activities with 99.7% accuracy.",
      icon: <Globe className="h-10 w-10 text-cognicblue-500" />,
      tags: ["Computer Vision", "Object Detection", "Real-time Analysis"],
    },
    {
      title: "QuantumAI",
      description: "Quantum computing integration with AI algorithms for solving complex optimization problems.",
      icon: <Cpu className="h-10 w-10 text-cognicblue-500" />,
      tags: ["Quantum Computing", "Optimization", "Algorithm Design"],
    },
    {
      title: "DataNexus",
      description: "Distributed data processing platform that handles petabytes of data for AI model training.",
      icon: <Database className="h-10 w-10 text-cognicblue-500" />,
      tags: ["Big Data", "Distributed Systems", "Cloud Computing"],
    },
  ]

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief AI Scientist",
      bio: "Ph.D. in Computational Neuroscience with 15+ years of experience in neural network design.",
    },
    {
      name: "Michael Rodriguez",
      role: "Lead AI Engineer",
      bio: "Former Google AI researcher specializing in deep learning and computer vision systems.",
    },
    {
      name: "Aisha Patel",
      role: "Data Science Director",
      bio: "Expert in big data analytics and machine learning model optimization.",
    },
  ]

  const contactInfo = {
    email: "info@cognicai.com",
    phone: "+1 (555) 123-4567",
    address: "123 Innovation Way, Tech District, San Francisco, CA 94105",
  }

  return (
    <div className="container mx-auto px-4 pt-20 h-full overflow-y-auto snap-y snap-mandatory">
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center snap-start">
        <div className="text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Innovating <span className="text-cognicblue-500">AI Systems</span>
          </motion.h1>
          <motion.p
            className="text-xl text-white max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            CognicAI develops cutting-edge artificial intelligence solutions that transform industries and enhance human
            capabilities.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              className="bg-cognicblue-500 hover:bg-cognicblue-400 text-white"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explore Our Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen py-20 snap-start">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            About <span className="text-cognicblue-500">CognicAI</span>
          </h2>
          <div className="bg-navy-900/30 backdrop-blur-md rounded-xl p-6 mb-12">
            <p className="text-white mb-4">
              CognicAI is at the forefront of artificial intelligence innovation, developing systems that seamlessly
              integrate with human workflows to enhance productivity, creativity, and decision-making.
            </p>
            <p className="text-white mb-4">
              Founded in 2018 by a team of AI researchers and engineers from leading tech companies and academic
              institutions, our mission is to create AI solutions that are not only powerful but also ethical,
              transparent, and accessible.
            </p>
            <p className="text-white">
              We specialize in neural networks, computer vision, natural language processing, and quantum computing
              applications of AI, with a focus on solving complex real-world problems across industries.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-white mb-6 text-center">Our Team</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="bg-navy-900/30 backdrop-blur-md border-navy-800">
                <CardHeader>
                  <CardTitle className="text-white">{member.name}</CardTitle>
                  <CardDescription className="text-white">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-20 snap-start">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Our <span className="text-cognicblue-500">Projects</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="bg-navy-900/30 backdrop-blur-md border-navy-800 overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center mb-2">{project.icon}</div>
                  <CardTitle className="text-white">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="text-xs bg-navy-800/50 text-white px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    className="text-cognicblue-500 hover:text-cognicblue-400 hover:bg-navy-800/50 p-0"
                  >
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-20 snap-start">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Get in <span className="text-cognicblue-500">Touch</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-navy-900/30 backdrop-blur-md border-navy-800">
              <CardHeader>
                <CardTitle className="text-white">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-cognicblue-500 mr-3" />
                  <p className="text-white">{contactInfo.email}</p>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-cognicblue-500 mr-3" />
                  <p className="text-white">{contactInfo.phone}</p>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-5 w-5 text-cognicblue-500 mr-3" />
                  <p className="text-white">{contactInfo.address}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-navy-900/30 backdrop-blur-md border-navy-800">
              <CardHeader>
                <CardTitle className="text-white">Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full p-3 rounded-md bg-blue-800/50 border border-blue-700 text-white placeholder:text-blue-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full p-3 rounded-md bg-blue-800/50 border border-blue-700 text-white placeholder:text-blue-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Your Message"
                      rows={4}
                      className="w-full p-3 rounded-md bg-blue-800/50 border border-blue-700 text-white placeholder:text-blue-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    ></textarea>
                  </div>
                  <Button className="w-full bg-cognicblue-500 hover:bg-cognicblue-400 text-white">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center text-blue-300 text-sm">
          <p>© {new Date().getFullYear()} CognicAI. All rights reserved.</p>
        </footer>
      </section>
    </div>
  )
}

