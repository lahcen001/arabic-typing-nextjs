import connectDB from '../lib/mongodb';
import Translation, { ITranslation } from '../models/Translation';

export class TranslationBackupService {
  
  /**
   * Save a translation to the backup database
   */
  static async saveTranslation(
    latinWord: string, 
    arabicSuggestions: string[], 
    bestMatch: string
  ): Promise<void> {
    try {
      await connectDB();
      
      const existingTranslation = await Translation.findOne({ 
        latinWord: latinWord.toLowerCase().trim() 
      });

      if (existingTranslation) {
        // Update existing translation
        existingTranslation.arabicSuggestions = arabicSuggestions;
        existingTranslation.bestMatch = bestMatch;
        existingTranslation.frequency += 1;
        existingTranslation.lastUsed = new Date();
        await existingTranslation.save();
      } else {
        // Create new translation
        await Translation.create({
          latinWord: latinWord.toLowerCase().trim(),
          arabicSuggestions,
          bestMatch,
          frequency: 1,
          lastUsed: new Date()
        });
      }
    } catch (error) {
      console.error('Error saving translation to backup:', error);
      // Don't throw error to avoid breaking the main API flow
    }
  }

  /**
   * Get a translation from the backup database
   */
  static async getTranslation(latinWord: string): Promise<ITranslation | null> {
    try {
      await connectDB();
      
      const translation = await Translation.findOne({ 
        latinWord: latinWord.toLowerCase().trim() 
      });

      if (translation) {
        // Update usage statistics
        await translation.incrementUsage();
        return translation;
      }

      return null;
    } catch (error) {
      console.error('Error retrieving translation from backup:', error);
      return null;
    }
  }

  /**
   * Get translation statistics
   */
  static async getStats(): Promise<{
    totalTranslations: number;
    mostUsedTranslations: ITranslation[];
    recentTranslations: ITranslation[];
  }> {
    try {
      await connectDB();
      
      const totalTranslations = await Translation.countDocuments();
      
      const mostUsedTranslations = await Translation
        .find()
        .sort({ frequency: -1 })
        .limit(10)
        .lean();

      const recentTranslations = await Translation
        .find()
        .sort({ lastUsed: -1 })
        .limit(10)
        .lean();

      return {
        totalTranslations,
        mostUsedTranslations,
        recentTranslations
      };
    } catch (error) {
      console.error('Error getting translation stats:', error);
      return {
        totalTranslations: 0,
        mostUsedTranslations: [],
        recentTranslations: []
      };
    }
  }

  /**
   * Search for similar translations (fuzzy search)
   */
  static async searchSimilar(latinWord: string, limit: number = 5): Promise<ITranslation[]> {
    try {
      await connectDB();
      
      // Use regex for fuzzy matching
      const regex = new RegExp(latinWord.toLowerCase().trim(), 'i');
      
      const similarTranslations = await Translation
        .find({ latinWord: regex })
        .sort({ frequency: -1 })
        .limit(limit)
        .lean();

      return similarTranslations;
    } catch (error) {
      console.error('Error searching similar translations:', error);
      return [];
    }
  }

  /**
   * Bulk import translations (useful for initial data seeding)
   */
  static async bulkImport(translations: Array<{
    latinWord: string;
    arabicSuggestions: string[];
    bestMatch: string;
  }>): Promise<number> {
    try {
      await connectDB();
      
      let importedCount = 0;
      
      for (const translation of translations) {
        await this.saveTranslation(
          translation.latinWord,
          translation.arabicSuggestions,
          translation.bestMatch
        );
        importedCount++;
      }

      return importedCount;
    } catch (error) {
      console.error('Error bulk importing translations:', error);
      return 0;
    }
  }

  /**
   * Clean up old unused translations
   */
  static async cleanup(daysOld: number = 90): Promise<number> {
    try {
      await connectDB();
      
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysOld);
      
      const result = await Translation.deleteMany({
        lastUsed: { $lt: cutoffDate },
        frequency: { $lt: 5 } // Keep frequently used translations
      });

      return result.deletedCount || 0;
    } catch (error) {
      console.error('Error cleaning up translations:', error);
      return 0;
    }
  }
} 