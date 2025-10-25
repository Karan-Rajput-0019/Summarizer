// Text Summarization Algorithm
// This implements an extractive summarization approach

class TextSummarizer {
  constructor() {
    this.maxWords = 200;
    this.minInputWords = 50;
  }

  // Main summarization function
  summarize(text) {
    if (!text || text.trim().length === 0) {
      throw new Error('Please provide text to summarize');
    }

    const wordCount = this.countWords(text);
    if (wordCount < this.minInputWords) {
      throw new Error(`Text must be at least ${this.minInputWords} words. Current: ${wordCount} words`);
    }

    // Split text into sentences
    const sentences = this.splitIntoSentences(text);
    
    if (sentences.length === 0) {
      throw new Error('Unable to process text. Please check the input.');
    }

    // If text is already short enough, return as is
    if (wordCount <= this.maxWords) {
      return text.trim();
    }

    // Calculate word frequencies
    const wordFreq = this.calculateWordFrequencies(text);

    // Score sentences based on various factors
    const scoredSentences = this.scoreSentences(sentences, wordFreq);

    // Select top sentences to form summary
    const summary = this.selectTopSentences(scoredSentences, this.maxWords);

    return summary;
  }

  // Split text into sentences
  splitIntoSentences(text) {
    // Remove extra whitespace
    text = text.trim().replace(/\s+/g, ' ');
    
    // Split on sentence boundaries
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    
    // Clean up sentences
    return sentences.map(s => s.trim()).filter(s => s.length > 0);
  }

  // Count words in text
  countWords(text) {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  }

  // Calculate word frequencies (excluding stop words)
  calculateWordFrequencies(text) {
    const stopWords = new Set([
      'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
      'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
      'to', 'was', 'were', 'will', 'with', 'this', 'but', 'they', 'have',
      'had', 'what', 'when', 'where', 'who', 'which', 'why', 'how', 'can',
      'could', 'would', 'should', 'may', 'might', 'must', 'shall', 'or'
    ]);

    const words = text.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.has(word));

    const freq = {};
    words.forEach(word => {
      freq[word] = (freq[word] || 0) + 1;
    });

    // Normalize frequencies
    const maxFreq = Math.max(...Object.values(freq));
    Object.keys(freq).forEach(word => {
      freq[word] = freq[word] / maxFreq;
    });

    return freq;
  }

  // Score sentences based on multiple factors
  scoreSentences(sentences, wordFreq) {
    return sentences.map((sentence, index) => {
      let score = 0;

      // Factor 1: Word frequency score
      const words = sentence.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .split(/\s+/);
      
      words.forEach(word => {
        score += wordFreq[word] || 0;
      });

      // Factor 2: Position score (first and last sentences are important)
      if (index === 0) {
        score += 2;
      } else if (index === sentences.length - 1) {
        score += 1.5;
      } else if (index < 3) {
        score += 1;
      }

      // Factor 3: Length score (prefer medium-length sentences)
      const wordCount = words.length;
      if (wordCount >= 10 && wordCount <= 25) {
        score += 1;
      }

      // Factor 4: Capital words (potential proper nouns/important terms)
      const capitalWords = sentence.match(/[A-Z][a-z]+/g) || [];
      score += capitalWords.length * 0.3;

      // Factor 5: Numbers (statistics are often important)
      const numbers = sentence.match(/\d+/g) || [];
      score += numbers.length * 0.5;

      return {
        text: sentence,
        score: score,
        index: index,
        wordCount: wordCount
      };
    });
  }

  // Select top sentences to form summary
  selectTopSentences(scoredSentences, maxWords) {
    // Sort by score (descending)
    const sorted = [...scoredSentences].sort((a, b) => b.score - a.score);

    const selectedSentences = [];
    let totalWords = 0;

    // Select sentences until we reach max words
    for (const sentence of sorted) {
      if (totalWords + sentence.wordCount <= maxWords) {
        selectedSentences.push(sentence);
        totalWords += sentence.wordCount;
      }
    }

    // Sort selected sentences by original order
    selectedSentences.sort((a, b) => a.index - b.index);

    // Join sentences to form summary
    return selectedSentences.map(s => s.text).join(' ');
  }

  // Get summary statistics
  getStats(text) {
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    const chars = text.length;
    const sentences = this.splitIntoSentences(text).length;

    return {
      words: words.length,
      characters: chars,
      sentences: sentences
    };
  }
}

// Export for use in main app
const textSummarizer = new TextSummarizer();