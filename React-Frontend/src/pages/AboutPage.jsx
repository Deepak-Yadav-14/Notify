import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  ArrowLeft,
  Brain,
  Target,
  Users,
  Heart,
  Lightbulb,
  Shield,
  Rocket,
  Code,
  MessageCircle,
  CheckCircle,
  Mail,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";

const AboutPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Founder & CEO",
      image: "AC",
      description:
        "Passionate about AI and productivity tools. 10+ years in tech.",
    },
    {
      name: "Sarah Kim",
      role: "Lead Developer",
      image: "SK",
      description:
        "Full-stack developer with expertise in React and AI integration.",
    },
    {
      name: "Marcus Rivera",
      role: "AI Specialist",
      image: "MR",
      description:
        "PhD in Machine Learning, focused on natural language processing.",
    },
    {
      name: "Elena Torres",
      role: "UX Designer",
      image: "ET",
      description: "Creating beautiful, intuitive interfaces that users love.",
    },
  ];

  const values = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation",
      description:
        "We constantly push the boundaries of what's possible in note-taking technology.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy",
      description:
        "Your data belongs to you. We prioritize security and privacy in everything we build.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "User-Centric",
      description:
        "Every feature is designed with our users' needs and feedback at the center.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Simplicity",
      description:
        "We believe powerful tools should be simple to use and beautiful to interact with.",
    },
  ];

  const milestones = [
    {
      year: "2023",
      title: "The Beginning",
      description:
        "Started as a side project to solve personal note-taking challenges.",
    },
    {
      year: "2024",
      title: "AI Integration",
      description:
        "Launched our first AI-powered chat feature for note interaction.",
    },
    {
      year: "2024",
      title: "Public Launch",
      description:
        "Released Talk with Notes to the public with positive user feedback.",
    },
    {
      year: "2025",
      title: "What's Next",
      description:
        "Expanding features and building collaboration tools for teams.",
    },
  ];

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-900/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-teal-900/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6 lg:px-12 border-b border-gray-800/50">
        <Link to="/" className="flex items-center space-x-3 group">
          <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg flex items-center justify-center shadow-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Talk with Notes
            </span>
          </div>
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-gray-800/50">
            Sign In
          </Link>
          <Link
            to="/register"
            className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white px-6 py-2 rounded-lg transition-all duration-300 shadow-lg">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 lg:px-12 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            About
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              {" "}
              Our Story
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to revolutionize how people interact with their
            notes and knowledge, making information more accessible and
            actionable through the power of AI.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative z-10 px-6 lg:px-12 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-blue-900/30 border border-blue-700/50 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
                <Target className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300 text-sm font-medium">
                  Our Mission
                </span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Empowering Knowledge Workers
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                In today's information-rich world, we believe that managing and
                accessing knowledge shouldn't be a barrier to productivity.
                That's why we created Talk with Notes – to bridge the gap
                between information storage and intelligent interaction.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Our platform combines the simplicity of traditional note-taking
                with the power of AI, allowing you to not just store
                information, but to have meaningful conversations with your
                knowledge base.
              </p>
            </div>
            <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 rounded-lg p-2">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">
                      Intelligent Interaction
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Ask questions about your notes and get contextual,
                      intelligent responses.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-teal-600 rounded-lg p-2">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">
                      Boost Productivity
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Spend less time searching and more time creating and
                      learning.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-emerald-600 rounded-lg p-2">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">
                      Privacy First
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Your data stays secure and private, always under your
                      control.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative z-10 px-6 lg:px-12 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do and every decision we
              make.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 text-center hover:bg-gray-800/60 transition-all duration-300 group">
                <div className="text-blue-400 mb-4 flex justify-center group-hover:text-blue-300 transition-colors">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative z-10 px-6 lg:px-12 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Passionate individuals working together to transform how you
              interact with information.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 text-center hover:bg-gray-800/60 transition-all duration-300 group">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                  {member.image}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-400 text-sm font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative z-10 px-6 lg:px-12 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Journey</h2>
            <p className="text-xl text-gray-400">
              From a simple idea to a powerful AI-enhanced platform.
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    {index + 1}
                  </div>
                </div>
                <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                      {milestone.year}
                    </span>
                    <h3 className="text-xl font-semibold text-white">
                      {milestone.title}
                    </h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="relative z-10 px-6 lg:px-12 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Built with Modern Technology
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We use cutting-edge technologies to deliver a fast, reliable, and
              secure experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Modern Frontend
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Built with React, offering a responsive and intuitive user
                interface that works seamlessly across all devices.
              </p>
            </div>

            <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                AI Integration
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Powered by advanced language models to provide intelligent
                responses and meaningful interactions with your notes.
              </p>
            </div>

            <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Secure Backend
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Enterprise-grade security with encrypted data storage and secure
                API endpoints to protect your information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative z-10 px-6 lg:px-12 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-blue-900/40 to-teal-900/40 backdrop-blur-xl border border-blue-700/50 rounded-3xl p-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                By the Numbers
              </h2>
              <p className="text-xl text-gray-300">
                Our growing community and the impact we're making together.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  10K+
                </div>
                <div className="text-gray-300">Active Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-teal-400 mb-2">
                  500K+
                </div>
                <div className="text-gray-300">Notes Created</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-emerald-400 mb-2">
                  1M+
                </div>
                <div className="text-gray-300">AI Conversations</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-400 mb-2">
                  99.9%
                </div>
                <div className="text-gray-300">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative z-10 px-6 lg:px-12 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-xl border border-gray-600/50 rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Get In Touch</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Have questions, feedback, or just want to say hello? We'd love to
              hear from you.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
              <a
                href="mailto:hello@talkwithnotes.com"
                className="flex items-center space-x-2 text-blue-300 hover:text-blue-200 transition-colors">
                <Mail className="w-5 h-5" />
                <span>hello@talkwithnotes.com</span>
              </a>
              <div className="flex items-center space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                  aria-label="Twitter">
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                  aria-label="GitHub">
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                  aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-2 text-gray-400">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>We typically respond within 24 hours</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800/50 px-6 lg:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-white">
                Talk with Notes
              </span>
            </div>
            <div className="flex items-center space-x-6 text-gray-400">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/login" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link to="/login" className="hover:text-white transition-colors">
                Terms
              </Link>
              <span className="text-sm">© 2024 Talk with Notes</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
