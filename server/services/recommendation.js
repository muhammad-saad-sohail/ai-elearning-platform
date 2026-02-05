/**
 * AI Recommendation Engine
 * Collaborative filtering + Content-based filtering for course recommendations
 */

class RecommendationEngine {
  constructor() {
    this.userProfiles = new Map();
    this.courseFeatures = new Map();
  }

  /**
   * Collaborative Filtering
   * Find users with similar learning patterns
   */
  collaborativeFiltering(userId, allUsers, allCourses) {
    const userInteractions = this.userProfiles.get(userId) || [];
    const recommendations = [];

    // Find similar users
    const similarUsers = this.findSimilarUsers(userId, allUsers);

    // Get courses liked by similar users but not taken by current user
    similarUsers.forEach(similarUser => {
      const theirCourses = this.userProfiles.get(similarUser.id) || [];
      theirCourses.forEach(course => {
        if (!userInteractions.includes(course.id)) {
          recommendations.push({
            courseId: course.id,
            score: similarUser.similarity * course.rating,
            method: 'collaborative'
          });
        }
      });
    });

    return recommendations;
  }

  /**
   * Content-Based Filtering
   * Match courses to user preferences based on content features
   */
  contentBasedFiltering(userId, userPreferences, allCourses) {
    const recommendations = [];

    allCourses.forEach(course => {
      const score = this.calculateContentSimilarity(
        userPreferences,
        this.courseFeatures.get(course.id)
      );

      if (score > 0.5) {
        recommendations.push({
          courseId: course.id,
          score,
          method: 'content-based'
        });
      }
    });

    return recommendations.sort((a, b) => b.score - a.score);
  }

  /**
   * Hybrid Recommendation
   * Combine collaborative and content-based methods
   */
  getRecommendations(userId, options = {}) {
    const {
      numRecommendations = 10,
      collaborativeWeight = 0.6,
      contentWeight = 0.4
    } = options;

    // Demo implementation with mock data
    const demoRecommendations = [
      {
        courseId: 'ml_fundamentals',
        title: 'Machine Learning Fundamentals',
        score: 0.95,
        reason: 'Based on your interest in AI and programming',
        tags: ['ai', 'machine-learning', 'python']
      },
      {
        courseId: 'data_science',
        title: 'Data Science with Python',
        score: 0.87,
        reason: 'Matches your skill level and learning goals',
        tags: ['data-science', 'python', 'analytics']
      },
      {
        courseId: 'deep_learning',
        title: 'Deep Learning Specialization',
        score: 0.82,
        reason: 'Natural progression from your completed courses',
        tags: ['deep-learning', 'neural-networks', 'tensorflow']
      },
      {
        courseId: 'web_dev',
        title: 'Full Stack Web Development',
        score: 0.75,
        reason: 'Popular among learners with similar profiles',
        tags: ['web-development', 'javascript', 'react']
      }
    ];

    return demoRecommendations.slice(0, numRecommendations);
  }

  /**
   * Find users with similar learning patterns
   */
  findSimilarUsers(userId, allUsers) {
    // Simplified cosine similarity
    const currentUserVector = this.getUserVector(userId);
    const similarities = [];

    allUsers.forEach(user => {
      if (user.id !== userId) {
        const userVector = this.getUserVector(user.id);
        const similarity = this.cosineSimilarity(currentUserVector, userVector);
        
        if (similarity > 0.5) {
          similarities.push({ id: user.id, similarity });
        }
      }
    });

    return similarities.sort((a, b) => b.similarity - a.similarity).slice(0, 10);
  }

  /**
   * Calculate cosine similarity between two vectors
   */
  cosineSimilarity(vec1, vec2) {
    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;

    for (let i = 0; i < vec1.length; i++) {
      dotProduct += vec1[i] * vec2[i];
      norm1 += vec1[i] * vec1[i];
      norm2 += vec2[i] * vec2[i];
    }

    return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
  }

  /**
   * Get user preference vector
   */
  getUserVector(userId) {
    // Mock implementation - return random vector for demo
    return Array.from({ length: 10 }, () => Math.random());
  }

  /**
   * Calculate similarity between user preferences and course features
   */
  calculateContentSimilarity(userPreferences, courseFeatures) {
    if (!userPreferences || !courseFeatures) return 0;

    // Simple tag-based similarity for demo
    const userTags = new Set(userPreferences.interests || []);
    const courseTags = new Set(courseFeatures.tags || []);
    
    const intersection = new Set([...userTags].filter(tag => courseTags.has(tag)));
    const union = new Set([...userTags, ...courseTags]);
    
    return intersection.size / union.size;
  }

  /**
   * Update user profile based on interactions
   */
  updateUserProfile(userId, interaction) {
    const profile = this.userProfiles.get(userId) || [];
    profile.push(interaction);
    this.userProfiles.set(userId, profile);
  }

  /**
   * Train recommendation model
   * In production, this would use TensorFlow.js or similar
   */
  async trainModel(trainingData) {
    console.log('Training recommendation model...');
    // Mock training for demo
    return {
      success: true,
      accuracy: 0.87,
      message: 'Model training - demo mode'
    };
  }
}

module.exports = RecommendationEngine;

// Demo usage
if (require.main === module) {
  const engine = new RecommendationEngine();
  
  const recommendations = engine.getRecommendations('user_123', {
    numRecommendations: 5
  });
  
  console.log('\n=== AI Course Recommendations ===\n');
  recommendations.forEach((rec, index) => {
    console.log(`${index + 1}. ${rec.title}`);
    console.log(`   Score: ${(rec.score * 100).toFixed(1)}%`);
    console.log(`   Reason: ${rec.reason}`);
    console.log(`   Tags: ${rec.tags.join(', ')}`);
    console.log('');
  });
}
