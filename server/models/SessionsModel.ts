import mongoose from 'mongoose';

export interface Session {
  userId: string;
  createdAt: Date;
}

const sessionSchema = new mongoose.Schema<Session>({
  userId: { type: String, required: true },
  createdAt: { type: Date, expires: '30m', default: Date.now },
});

//does models already exist, if it does, export it as a model 
//if its null or undefined, then we are going to create it!
//this code below allows the export to work! without, it will return potentially undefined which typescript does not like! 
const SessionsModel =
  (mongoose.models.Session as mongoose.Model<Session>) ||
  mongoose.model("Session", sessionSchema);

  export default SessionsModel;
