import { Response } from '@/components/server/Response';
import connectMongoDB from '@/libs/mongodb';
import House from '@/models/db_house';
import mongoose from 'mongoose';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import url from 'url';

export async function GET(req: NextApiRequest) {
  const parsedUrl = await url.parse(req.url || '', true);
  const { firstAuthorId, secondAuthorId } = parsedUrl.query;
  try {
    if (!firstAuthorId || !secondAuthorId) return NextResponse.json(Response(400, null), { status: 400 });
    await connectMongoDB();
    const _data = await House.aggregate([
      {
        $lookup: {
          from: 'authors',
          localField: 'name',
          foreignField: 'name',
          as: 'personInfo',
        },
      },
      {
        $match: {
          $or: [
            { 'personInfo._id': new mongoose.Types.ObjectId(firstAuthorId as string) },
            { 'personInfo._id': new mongoose.Types.ObjectId(secondAuthorId as string) },
          ],
        },
      },
    ]);

    const result = _data.reduce(
      (prev, curr) => {
        if (curr.personInfo[0]._id.toString() === firstAuthorId) {
          prev.firstAuthor.push(curr);
        } else {
          prev.secondAuthor.push(curr);
        }
        return prev;
      },
      { firstAuthor: [], secondAuthor: [] },
    );
    return NextResponse.json(Response(200, result), { status: 200 });
  } catch (err) {
    console.log(err);
  }
}
