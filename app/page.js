"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Provider from "./provider";
import { useState, useEffect, useRef } from "react"; // Import useRef
import { supabase } from "@/services/supabaseClient";
import { useRouter } from "next/navigation";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  // Create refs for the navigation and menu button
  const navRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    if (session) {
      // Store in cookie
      document.cookie = `userSession=${JSON.stringify(session?.provider_token)}; path=/`;
    }
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } = {} } = supabase.auth.onAuthStateChange( // Destructure with default empty object
      (event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    // Click outside handler
    const handleClickOutside = (event) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up subscription
      if (subscription) {
        subscription.unsubscribe();
      }
      // Clean up event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount

  const signInWithGoogle = async () => {
    router.push('/auth');
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsMobileMenuOpen(false); // Close menu on sign out
    document.cookie = "userSession=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  };

  const goToDashboard = () => {
    router.push('/dashboard');
    setIsMobileMenuOpen(false); // Close menu when navigating to dashboard
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Provider />

      {/* Navigation */}
      <nav ref={navRef} className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Image 
                src="/logo.png"
                alt="AiCruiter Logo"
                width={100}
                height={100}
                className="h-12 w-full"
              />
            </div>

            {/* Hamburger Icon for Mobile */}
            <div className="md:hidden flex items-center">
              <button
                ref={menuButtonRef} // Attach ref to the button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                aria-expanded={isMobileMenuOpen ? "true" : "false"}
              >
                <span className="sr-only">Open main menu</span>
                {/* Icon when menu is closed. */}
                {!isMobileMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  // Icon when menu is open.
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={user.user_metadata?.avatar_url}
                      alt="Profile"
                      className="w-8 h-8 rounded-full" />
                    <span className="text-sm text-gray-700">
                      {user.user_metadata?.full_name}
                    </span>
                  </div>
                  <Button onClick={goToDashboard} variant="outline" size="sm">
                    Dashboard
                  </Button>
                  <Button onClick={signOut} variant="ghost" size="sm">
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button onClick={signInWithGoogle} className="bg-indigo-600 hover:bg-indigo-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 48 48" className="mr-2">
                    <path fill="white" d="M43.6 20.5H42V20H24v8h11.3C33.6 32.4 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l6-6C34.6 5.2 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.5 20-21 0-1.3-.1-2.7-.4-4.5z" />
                  </svg>
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu (conditionally rendered) */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {user ? (
                <>
                  <div className="flex items-center justify-center space-x-2 px-3 py-2 text-base font-medium text-gray-700">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={user.user_metadata?.avatar_url}
                      alt="Profile"
                      className="w-8 h-8 rounded-full" />
                    <span>{user.user_metadata?.full_name}</span>
                  </div>
                  <Button
                    onClick={() => { goToDashboard(); setIsMobileMenuOpen(false); }}
                    className="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                    variant="ghost"
                  >
                    Dashboard
                  </Button>
                  <Button
                    onClick={() => { signOut(); setIsMobileMenuOpen(false); }}
                    className="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                    variant="ghost"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => { signInWithGoogle(); setIsMobileMenuOpen(false); }}
                  className="block w-full text-center px-3 py-2 rounded-md text-base font-medium bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 mt-10 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="relative">
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Ace Your Next
                <span className="block bg-gradient-to-br from-blue-400 to-indigo-600 bg-clip-text text-transparent">
                  Interview
                </span>
              </h1>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full blur-xl opacity-20 animate-pulse delay-1000"></div>
            </div>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Practice interviews with our AI agent tailored to your job position and description.
              Get instant feedback, identify improvement areas, and boost your confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {user ? (
                <Button
                  onClick={goToDashboard}
                  size="lg"
                  className="bg-gradient-to-br from-blue-400 to-indigo-600 hover:from-blue-700 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Go to Dashboard
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              ) : (
                <>
                  <Button
                    onClick={signInWithGoogle}
                    size="lg"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" className="mr-2">
                      <path fill="white" d="M43.6 20.5H42V20H24v8h11.3C33.6 32.4 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l6-6C34.6 5.2 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.5 20-21 0-1.3-.1-2.7-.4-4.5z" />
                    </svg>
                    Start Practicing Now
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 py-4 text-lg rounded-xl border-2 hover:bg-gray-50 transition-all duration-300"
                  >
                    Learn More
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose AiCruiter?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Master your interview skills with AI-powered practice sessions tailored to your dream job.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Interviews</h3>
              <p className="text-gray-600 leading-relaxed">
                Experience realistic interview scenarios powered by advanced AI that adapts to your job position and requirements.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19c-5 0-8-4-8-8s3-8 8-8 8 4 8 8-3 8-8 8zm0 0V9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0116.07 4H19a2 2 0 012 2v1a2 2 0 01-2 2h-.93a2 2 0 00-1.664.89l-.812 1.22A2 2 0 0114.93 12H12a2 2 0 01-2-2V9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Instant Feedback</h3>
              <p className="text-gray-600 leading-relaxed">
                Get detailed feedback and actionable insights immediately after each interview session to improve your performance.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Personalized Practice</h3>
              <p className="text-gray-600 leading-relaxed">
                Create custom job positions and descriptions to practice for specific roles and industries that match your career goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-400 to-indigo-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-indigo-200">Interviews Practiced</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-indigo-200">Success Rate</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-indigo-200">Job Positions</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-indigo-200">AI Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of job seekers who've improved their interview skills and confidence with AiCruiter.
          </p>

          {!user && (
            <Button
              onClick={signInWithGoogle}
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-12 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" className="mr-2">
                <path fill="white" d="M43.6 20.5H42V20H24v8h11.3C33.6 32.4 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l6-6C34.6 5.2 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.5 20-21 0-1.3-.1-2.7-.4-4.5z" />
              </svg>
              Start Your Interview Practice
            </Button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <span className="text-xl font-bold">AiCruiter</span>
            </div>

            <div className="flex space-x-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AiCruiter. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}