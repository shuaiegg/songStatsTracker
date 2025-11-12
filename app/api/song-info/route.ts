import { time, timeStamp } from "console";
import { NextResponse } from "next/server";

// 服务器端处理 POST 请求
export async function POST(req: Request) {
  try {
    const { songId } = await req.json();

    // 假设你要访问的音乐API是这个：https://beta-luna.douyin.com/luna/h5/seo_track?track_id=7565441743598209040
    const res = await fetch(`https://beta-luna.douyin.com/luna/h5/seo_track?track_id=${songId}`);

    // 获取返回的JSON
    const data = await res.json();

    const song = data.seo_track.track;

    console.log("Fetched song data:", data.seo_track.track);

    // 你可以在这里进行数据清洗，只返回需要的字段
    return NextResponse.json({
    time: new Date().toISOString(),
      id: song.id,
      name: song.name,
      artis: song.artists[0].name,
    //   count_collected: data.stats.count_collected,
    //   count_coment: data.stats.count_comment,
    //   count_shared: data.stats.count_shared,
      stats: song.stats,
    });
  } catch (error) {
    return NextResponse.json({ error: "查询失败" }, { status: 500 });
  }
}