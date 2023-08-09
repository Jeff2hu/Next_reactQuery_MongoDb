import mongoose, { Schema } from 'mongoose';

const HouseSchema = new Schema(
  {
    name: String,
    price: Number,
    area: String,
    floor: Number,
    elevator: Boolean,
    parking: Boolean,
  },
  {
    timestamps: true,
  },
);

const House = mongoose.models.houses || mongoose.model('houses', HouseSchema);

export default House;
