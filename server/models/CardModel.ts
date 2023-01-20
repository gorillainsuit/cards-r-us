import mongoose from 'mongoose';

export interface Card {
  author: string;
  image: string;
  message: string;
  messageColor: string;
  subscribers: string[];
  createdAt: Date;
}
const cardSchema = new mongoose.Schema<Card>({
  author: { type: String, required: true },
  image: { type:String, required: true },
  message: { type: String, default: '' },
  messageColor: { type: String, default: '#FFFFFF' },
  subscribers: { type: Array(String), default: [] },
  createdAt: { type: Date, default: new Date() },
});

const CardModel =
  (mongoose.models.Card as mongoose.Model<Card>) ||
  mongoose.model("Card", cardSchema);

export default CardModel;
