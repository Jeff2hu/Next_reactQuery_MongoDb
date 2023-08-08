import { Response } from '@/components/server/Response';
import connectMongoDB from '@/libs/mongodb';
import Author from '@/models/db_author';
import { NextResponse } from 'next/server';
import { NextApiRequest } from 'next/types';

export async function GET(req: NextApiRequest) {
  try {
    await connectMongoDB();
    const _data = await Author.find();
    const result: AuthorData[] = _data.map((item) => ({
      name: item.name,
      age: item.age,
      residence: item.residence,
      id: item._id,
    }));
    return NextResponse.json(Response(200, result), { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(Response(500, null), { status: 500 });
  }
}
