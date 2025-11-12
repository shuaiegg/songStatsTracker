"use client";

import { useState } from "react";

export default function SongSearchPage() {
  const [songId, setSongId] = useState("");
  const [song, setSong] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/song-info", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ songId }),
    });

    const data = await res.json();
    setSong(data);
    setLoading(false);
  }

  return (
    <main>
      <section>
    <div style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, sans-serif",
        color: "#111827",
        padding: "2rem",
      }}>
      <h1 style={{
          fontSize: "2rem",
          fontWeight: 700,
          textAlign: "center",
          marginBottom: "1.5rem",
        }}>歌曲信息查询</h1>
      <form style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          marginBottom: "2rem",}} onSubmit={handleSubmit}>
        <input style={{
            padding: "12px 16px",
            fontSize: "16px",
            width: "340px",
            borderRadius: "8px",
            border: "1.5px solid #d1d5db",
            outline: "none",
            transition: "0.2s",
          }}
          onFocus={(e) => (e.currentTarget.style.border = "1.5px solid #2563eb")}
          onBlur={(e) => (e.currentTarget.style.border = "1.5px solid #d1d5db")}
          value={songId}
          onChange={(e) => setSongId(e.target.value)}
          placeholder="输入歌曲ID"
          required
        />
        <button style={{
            padding: "12px 18px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "0.2s",
          }} type="submit" disabled={loading}>
          {loading ? "查询中..." : "查询"}
        </button>
      </form>

      {song && !song.error && (
        <div  style={{
            // display: "flex",
            // flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "40px",
            backgroundColor: "white",
            padding: "24px 36px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            maxWidth: "700px",
            width: "90%",
          }}>
          
          <p>歌曲名:{song.name}</p>
          <p>歌手：{song.artis}</p>
          <p>收藏量：{song.stats.count_collected}</p>
          <p>评论量：{song.stats.count_comment}</p>
          <p>分享量：{song.stats.count_shared}</p>
          <p>服务器时间:{song.time}</p>
          <button style={{
                marginTop: "12px",
                padding: "10px 16px",
                backgroundColor: "#10b981", // 偏绿色
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "15px",
                transition: "0.2s",
              }} onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#059669")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#10b981")
              }>加入追踪（待开发）</button>

          {/* <img src={song.cover} alt={song.title} width={200} />
          <br />
          <a href={song.url} target="_blank">播放链接</a> */}
        </div>
      )}

      {song?.error && <p style={{ color: "red" }}>{song.error}</p>}
    </div>
    </section>
    </main>
  );
}