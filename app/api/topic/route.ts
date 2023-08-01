import { Response } from "@/components/server/Response";
import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";
import { NextApiRequest } from "next/types";
import url from 'url';

export async function POST(req:Request){
    const { title, description } = await req.json() as TopicRequest;
    if(!title || !description) return NextResponse.json(Response(400, null), {status: 400})
    try{
        await connectMongoDB();
        await Topic.create({title, description});
        return NextResponse.json(Response(200, {title, description}), {status: 200})
    }catch(err){
        console.log(err)
        return NextResponse.json(Response(500, null), {status: 500})
    }
}

export async function GET(req:NextApiRequest){
    const parsedUrl = await url.parse(req.url || '', true);
    const { id } = parsedUrl.query;
    // return NextResponse.json(Response(400, null), {status: 200}) // 測試走Bad Request 跳Alert
    try{
        await connectMongoDB();
        if(id){
            const _data = await Topic.findById(id);
            const result: TopicResponse = { title: _data.title, description: _data.description, id: _data._id}
            return NextResponse.json(Response(200, result), {status: 200})
        }else {
            const _data = await Topic.find();
            const result: TopicResponse[] = _data.map(item => ({ title: item.title, description: item.description, id: item._id}))
            return NextResponse.json(Response(200, result), {status: 200})
        }
    }catch(err){
        console.log(err)
        return NextResponse.json(Response(500, null), {status: 500})
    }
}

export async function DELETE(req:Request){
    const parsedUrl = await url.parse(req.url || '', true);
    const { id } = parsedUrl.query;
    try{
        await connectMongoDB();
        await Topic.findByIdAndDelete(id);
        return NextResponse.json(Response(200, `id:${id}已被刪除`), {status: 200})
    }catch(err){
        console.log(err)
        return NextResponse.json(Response(500, null), {status: 500})
    }
}

export async function PUT(req:Request){
    const { title, description, id } = await req.json() as TopicRequest;
    if(!id) return NextResponse.json(Response(400, "Bad Request"), {status: 400})
    try{
        await connectMongoDB();
        await Topic.findByIdAndUpdate(id, { title, description });
        return NextResponse.json(Response(200, { title, description, id }), {status: 200})
    }catch(err){
        console.log(err)
        return NextResponse.json(Response(500, null), {status: 500})
    }
}