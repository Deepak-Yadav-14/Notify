import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FileText,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  Users,
  Brain,
  Search,
  Star,
  CheckCircle,
} from "lucide-react";

const HomePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     navigate("/dashboard");
  //   }
  //   setIsLoaded(true);
  // }, [navigate]);

  useEffect(() => {
    setIsLoaded(true);
  }, [navigate]);

  const features = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Smart Note Taking",
      description:
        "Create, organize, and manage your notes with an intuitive interface designed for productivity.",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Chat",
      description:
        "Ask questions about your notes and get intelligent responses from our AI assistant.",
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Instant Search",
      description:
        "Find any note instantly with our powerful search functionality across all your content.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description:
        "Your data is encrypted and secure. We prioritize your privacy and data protection.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description:
        "Experience blazing-fast performance with real-time updates and seamless synchronization.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Ready",
      description:
        "Built for individuals and teams with collaboration features coming soon.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      content:
        "This app has revolutionized how I organize my thoughts. The AI chat feature is incredibly helpful for reviewing my notes.",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "Student",
      content:
        "Perfect for academic work. I can quickly find information from my lecture notes just by asking questions.",
      rating: 5,
    },
    {
      name: "Elena Rodriguez",
      role: "Writer",
      content:
        "The clean interface and smart search make it easy to manage all my writing projects and research notes.",
      rating: 5,
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
      <nav className="relative z-10 flex justify-between items-center p-6 lg:px-12">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h1 className="font-bold text-xl bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
            Notify
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to="/about"
            className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-gray-800/50">
            About
          </Link>
          <Link
            to="/login"
            className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-gray-800/50">
            Sign In
          </Link>
          <Link
            to="/register"
            className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white px-6 py-2 rounded-lg transition-all duration-300 shadow-lg">
            Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 lg:px-12 pt-20 pb-32">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-900/30 border border-blue-700/50 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-medium">
              AI-Powered Note Taking
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Your Notes,
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
              Supercharged
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your note-taking experience with AI-powered insights.
            Create, organize, and interact with your notes like never before.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/login"
              className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-2xl hover:shadow-blue-900/30 transition-all duration-300 flex items-center space-x-2 group">
              <span>Start Taking Notes</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/about"
              className="border border-gray-600/50 hover:border-gray-500/50 text-gray-300 hover:text-white px-8 py-4 rounded-2xl text-lg font-semibold backdrop-blur-sm transition-all duration-300">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 px-6 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Powerful features designed to enhance your productivity and make
              note-taking effortless.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/60 transition-all duration-300 group hover:border-blue-500/30">
                <div className="text-blue-400 mb-4 group-hover:text-blue-300 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Preview */}
      <section className="relative z-10 px-6 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              See It In Action
            </h2>
            <p className="text-xl text-gray-400">
              Experience the power of AI-enhanced note-taking
            </p>
          </div>

          <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
            <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-600/30">
              <div className="flex items-center space-x-3 mb-6">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-gray-400 text-sm">
                  Notify - Dashboard
                </span>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <div className="bg-gray-800/60 rounded-xl p-4 border border-gray-600/30">
                  <div className="flex items-center space-x-2 mb-3">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300 text-sm font-medium">
                      Notes
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-3">
                      <div className="text-blue-200 text-sm font-medium">
                        Meeting Notes
                      </div>
                      <div className="text-gray-400 text-xs">
                        Project discussion...
                      </div>
                    </div>
                    <div className="bg-gray-700/50 border border-gray-600/30 rounded-lg p-3">
                      <div className="text-gray-300 text-sm">
                        Research Ideas
                      </div>
                      <div className="text-gray-500 text-xs">
                        AI applications...
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 bg-gray-800/60 rounded-xl p-4 border border-gray-600/30">
                  <div className="flex items-center space-x-2 mb-3">
                    <MessageCircle className="w-4 h-4 text-teal-400" />
                    <span className="text-gray-300 text-sm font-medium">
                      Ask Notify
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-end">
                      <div className="bg-blue-600 text-white rounded-lg p-3 max-w-xs text-sm">
                        What were the main points from my meeting notes?
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-gray-700/60 text-gray-200 rounded-lg p-3 max-w-xs text-sm">
                        Based on your meeting notes, the main points were: 1)
                        Project timeline review 2) Budget allocation 3) Team
                        assignments for Q4...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 lg:px-12 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-900/40 to-teal-900/40 backdrop-blur-xl border border-blue-700/50 rounded-3xl p-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Notes?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join all the users who have already enhanced their productivity
              with AI-powered note-taking.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/register"
                className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-2xl hover:shadow-blue-900/30 transition-all duration-300 flex items-center space-x-2 group">
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="flex items-center space-x-2 text-gray-400">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>No credit card required</span>
              </div>
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
              <Link to="/about" className="hover:text-white transition-colors">
                About
              </Link>
              <Link to="/login" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link to="/login" className="hover:text-white transition-colors">
                Terms
              </Link>
              <span className="text-sm">© 2025 Notify</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
