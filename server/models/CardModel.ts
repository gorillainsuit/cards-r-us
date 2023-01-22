import mongoose from 'mongoose';
import { Texture } from '../../client/components/Card/Card';

export interface CardData {
  id: string;
  image: {
    src: string;
    alt: string;
  };
  color: {
    back: string;
    banner?: string;
  };
  texture?: {
    pattern: Texture;
    intensity: number;
  };
  text: {
    front: {
      value: string;
      color: string;
      position: 'top' | 'middle' | 'bottom';
    };
    back: {
      value: string;
      color: string;
    };
  };
  authorId: string;
  ownerId: string;
  createdAt: Date;
}

const cardSchema = new mongoose.Schema<CardData>(
  {
    image: {
      src: { type: String, required: true },
      alt: { type: String, required: true },
    },
    color: {
      back: { type: String, required: true },
      banner: { type: String, required: false },
      texture: { type: String, required: false },
    },
    texture: {
      pattern: { type: String, required: false },
      intensity: { type: Number, required: false },
    },
    text: {
      front: {
        value: { type: String, required: true },
        color: { type: String, required: true },
        position: { type: String, required: true },
      },
      back: {
        value: { type: String, required: true },
        color: { type: String, required: true },
      },
    },
    authorId: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const CardModel =
  (mongoose.models.Card as mongoose.Model<CardData>) ||
  mongoose.model('Card', cardSchema);

export default CardModel;
