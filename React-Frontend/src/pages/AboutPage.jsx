import { useState, useEffect } from "react";
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
  CheckCircle,
  Mail,
  Github,
  Linkedin,
  Coffee,
  Zap,
  Layers,
} from "lucide-react";
import avatar from "../assets/ProfilePicWithOUT.png";

const AboutPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
        <a href="/" className="flex items-center space-x-3 group">
          <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg flex items-center justify-center shadow-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Notify
            </span>
          </div>
        </a>
        <div className="flex items-center space-x-4">
          <a
            href="/login"
            className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-gray-800/50">
            Sign In
          </a>
          <a
            href="/register"
            className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white px-6 py-2 rounded-lg transition-all duration-300 shadow-lg">
            Get Started
          </a>
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
                That's why we created Notify – to bridge the gap between
                information storage and intelligent interaction.
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

      {/* Meet the Developer - New Design */}
      <section className="relative z-10 px-6 lg:px-12 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800/50 via-gray-800/40 to-slate-900/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-12 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-teal-500/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <div className="grid lg:grid-cols-2 gap-2 items-center">
                {/* Left side - Content */}
                <div>
                  <div className="inline-flex items-center space-x-2 bg-purple-900/30 border border-purple-700/50 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
                    <Brain className="w-4 h-4 text-purple-400" />
                    <span className="text-purple-300 text-sm font-medium">
                      Solo Creator
                    </span>
                  </div>

                  <h2 className="text-4xl font-bold text-white mb-6">
                    Built by
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {" "}
                      Master Of None
                    </span>
                  </h2>
                  <div className="italic text-lg text-gray-400 border-l-2 border-purple-500/50 pl-4">
                    "Jack of all trades, master of none, though oftentimes
                    better than master of one."
                    <div className="text-sm text-gray-500 mt-2">
                      — William Shakespeare
                    </div>
                  </div>

                  {/* <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    This entire platform is crafted by someone who believes in
                    the power of curiosity and continuous learning. Every line
                    of code, every design decision, and every feature comes from
                    a passion for building things that matter.
                  </p> */}

                  {/* <div className="space-y-4 mb-8">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-400">
                        Full-stack development from frontend to AI integration
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                      <span className="text-gray-400">
                        Design thinking meets technical execution
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-gray-400">
                        Always learning, always building, always improving
                      </span>
                    </div>
                  </div> */}
                </div>

                {/* Right side - Visual */}
                <div className="flex justify-center lg:justify-end">
                  <div className="relative">
                    {/* Main avatar */}
                    <div className="w-48 h-48 bg-gradient-to-br from-blue-800 via-purple-800 to-pink-800 rounded-3xl flex items-center justify-center text-white text-4xl font-bold shadow-2xl relative z-10">
                      <div className="relative w-48 h-48">
                        <img
                          alt="avatar"
                          src={avatar}
                          className="w-full h-full object-cover rounded-3xl"
                        />
                        <h1 className="text-shadow-gray-950 font-bold font-sans text-xl text-center absolute  left-1/2 top-37 transform -translate-x-1/2 -translate-y-1/2">
                          MASTER OF NONE
                        </h1>
                      </div>
                    </div>

                    {/* Floating skill badges */}
                    <div className="absolute -top-4 -right-4 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-xl p-3 animate-pulse">
                      <Code className="w-6 h-6 text-blue-400" />
                    </div>

                    <div className="absolute -bottom-4 -left-4 bg-teal-500/20 backdrop-blur-sm border border-teal-400/30 rounded-xl p-3 animate-pulse delay-500">
                      <Layers className="w-6 h-6 text-teal-400" />
                    </div>

                    <div className="absolute top-1/2 -left-8 bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-xl p-3 animate-pulse delay-1000">
                      <Zap className="w-6 h-6 text-purple-400" />
                    </div>

                    <div className="absolute top-1/2 -right-8 bg-pink-500/20 backdrop-blur-sm border border-pink-400/30 rounded-xl p-3 animate-pulse delay-700">
                      <Coffee className="w-6 h-6 text-pink-400" />
                    </div>

                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-xl -z-10"></div>
                  </div>
                </div>
              </div>

              {/* Bottom stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-gray-700/50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">∞</div>
                  <div className="text-sm text-gray-400">Lines of Code</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">24/7</div>
                  <div className="text-sm text-gray-400">Curiosity Mode</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">∞</div>
                  <div className="text-sm text-gray-400">Coffee Consumed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">1</div>
                  <div className="text-sm text-gray-400">Human, Many Hats</div>
                </div>
              </div>
            </div>
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

      <section className="relative z-10 px-6 lg:px-12 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-blue-900/40 to-teal-900/40 backdrop-blur-xl border border-blue-700/50 rounded-3xl p-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Get Started in Minutes
              </h2>
              <p className="text-xl text-gray-300">
                Jump right in and start experiencing the power of AI-assisted
                productivity.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-400">1</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Sign Up
                </h3>
                <p className="text-gray-300">Create your account in seconds</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-teal-400">2</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Create
                </h3>
                <p className="text-gray-300">
                  Start your first note or conversation
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-emerald-400">3</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Explore
                </h3>
                <p className="text-gray-300">Discover AI-powered features</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-400">4</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Excel</h3>
                <p className="text-gray-300">Boost your productivity daily</p>
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
              <span className="font-bold text-lg text-white">Notify</span>
            </div>
            <div className="flex items-center space-x-6 text-gray-400">
              <a href="/" className="hover:text-white transition-colors">
                Home
              </a>
              <a href="/login" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="/login" className="hover:text-white transition-colors">
                Terms
              </a>
              <span className="text-sm">© 2025 Notify</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
