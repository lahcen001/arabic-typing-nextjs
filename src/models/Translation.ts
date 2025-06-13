import mongoose from 'mongoose';

export interface ITranslation {
  latinWord: string;
  arabicSuggestions: string[];
  bestMatch: string;
  frequency: number;
  lastUsed: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TranslationSchema = new mongoose.Schema<ITranslation>({
  latinWord: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  arabicSuggestions: [{
    type: String,
    required: true
  }],
  bestMatch: {
    type: String,
    required: true
  },
  frequency: {
    type: Number,
    default: 1
  },
  lastUsed: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create indexes for better performance
TranslationSchema.index({ latinWord: 1 });
TranslationSchema.index({ frequency: -1 });
TranslationSchema.index({ lastUsed: -1 });

// Update frequency and lastUsed when accessed
TranslationSchema.methods.incrementUsage = function() {
  this.frequency += 1;
  this.lastUsed = new Date();
  return this.save();
};

const Translation = mongoose.models.Translation || mongoose.model<ITranslation>('Translation', TranslationSchema);

export default Translation; 