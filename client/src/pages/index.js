/**
 * AI E-Learning Platform - Home Page
 * Next.js landing page with course listings and recommendations
 */

import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
    fetchRecommendations();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/courses');
      const data = await response.json();
      if (data.success) {
        setCourses(data.courses);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/courses/recommendations');
      const data = await response.json();
      if (data.success) {
        setRecommendations(data.recommendations);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <>
      <Head>
        <title>AI E-Learning Platform - Personalized Learning Experience</title>
        <meta name="description" content="AI-powered learning platform with personalized course recommendations" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-3xl">📚</span>
                <h1 className="ml-3 text-2xl font-bold text-gray-800">
                  AI E-Learning Platform
                </h1>
              </div>
              <nav>
                <button className="px-4 py-2 text-gray-700 hover:text-indigo-600 transition">
                  Sign In
                </button>
                <button className="ml-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                  Sign Up
                </button>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-16">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-gray-800 mb-4">
              Learn Smarter with AI 🚀
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Get personalized course recommendations based on your interests and learning style
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg text-lg font-semibold hover:bg-indigo-700 transition transform hover:scale-105">
                Explore Courses
              </button>
              <button className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition">
                How It Works
              </button>
            </div>
          </div>
        </section>

        {/* AI Recommendations Section */}
        {recommendations.length > 0 && (
          <section className="container mx-auto px-6 py-12">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <span className="text-3xl mr-3">🤖</span>
                <h2 className="text-3xl font-bold text-gray-800">
                  Recommended For You
                </h2>
              </div>
              <p className="text-gray-600 mb-6">
                Based on AI analysis of your interests and learning patterns
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {recommendations.map((rec, index) => (
                  <div 
                    key={index}
                    className="border border-indigo-200 rounded-lg p-6 hover:shadow-lg transition cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {rec.title}
                      </h3>
                      <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {Math.round(rec.matchScore * 100)}% Match
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      💡 {rec.reason}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {rec.tags && rec.tags.map((tag, i) => (
                        <span 
                          key={i}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Courses Section */}
        <section className="container mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Popular Courses
          </h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading courses...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div 
                  key={course.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2"
                >
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-48 flex items-center justify-center">
                    <span className="text-6xl">📖</span>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-indigo-600 font-semibold">
                        {course.level}
                      </span>
                      <div className="flex items-center">
                        <span className="text-yellow-500">⭐</span>
                        <span className="ml-1 text-sm font-semibold">{course.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {course.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4">
                      by {course.instructor}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>👥 {course.students.toLocaleString()} students</span>
                      <span>⏱️ {course.duration}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-indigo-600">
                        ${course.price}
                      </span>
                      <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose Our Platform?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                AI-Powered Recommendations
              </h3>
              <p className="text-gray-600">
                Get personalized course suggestions based on your learning patterns and interests
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Track Your Progress
              </h3>
              <p className="text-gray-600">
                Monitor your learning journey with detailed analytics and insights
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Collaborative Learning
              </h3>
              <p className="text-gray-600">
                Connect with peers and instructors through real-time chat and forums
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8 mt-16">
          <div className="container mx-auto px-6 text-center">
            <p className="text-lg mb-2">
              AI E-Learning Platform v1.0.0
            </p>
            <p className="text-sm text-gray-400">
              Developed by Muhammad Saad Sohail | Final Year Project
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Arid Agriculture University, Rawalpindi
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
