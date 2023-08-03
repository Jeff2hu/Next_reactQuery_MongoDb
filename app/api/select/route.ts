import { Response } from '@/components/server/Response';
import connectMongoDB from '@/libs/mongodb';
import Topic from '@/models/topic';
import { NextResponse } from 'next/server';
import { NextApiRequest } from 'next/types';
import url from 'url';

export async function GET(req: NextApiRequest) {
  const parsedUrl = await url.parse(req.url || '', true);
  const { id } = parsedUrl.query;
  try {
    await connectMongoDB();
    if (id) {
      const _data = await Topic.findById(id);
      const result: TopicData = { title: _data.title, description: _data.description, id: _data._id };
      return NextResponse.json(Response(200, result), { status: 200 });
    } else {
      const _data = await Topic.find();
      const result: TopicData[] = _data.map((item) => ({
        title: item.title,
        description: item.description,
        id: item._id,
      }));
      return NextResponse.json(Response(200, result), { status: 200 });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(Response(500, null), { status: 500 });
  }
}
