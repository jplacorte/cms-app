import { VideoBlockProps } from "@/lib/types";

export default function VideoBlock({
  url = "",
  aspectRatio = "16/9",
  borderRadius = "8px",
}: VideoBlockProps) {
  // Detect YouTube or Vimeo and build embed URL
  const getEmbedUrl = (rawUrl: string): string | null => {
    try {
      const u = new URL(rawUrl);
      // YouTube
      if (u.hostname.includes("youtube.com") || u.hostname.includes("youtu.be")) {
        const videoId = u.hostname.includes("youtu.be")
          ? u.pathname.slice(1)
          : u.searchParams.get("v");
        if (videoId) return `https://www.youtube.com/embed/${videoId}`;
      }
      // Vimeo
      if (u.hostname.includes("vimeo.com")) {
        const videoId = u.pathname.split("/").pop();
        if (videoId) return `https://player.vimeo.com/video/${videoId}`;
      }
    } catch {
      // Not a valid URL
    }
    return null;
  };

  const embedUrl = getEmbedUrl(url);

  if (!url) {
    return (
      <div
        style={{ aspectRatio, width: "100%" }}
        className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center text-slate-400 text-sm"
      >
        Paste a YouTube, Vimeo, or video URL in the properties panel.
      </div>
    );
  }

  if (embedUrl) {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio,
          borderRadius,
          overflow: "hidden",
        }}
      >
        <iframe
          src={embedUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
        />
      </div>
    );
  }

  // Fallback: self-hosted video
  return (
    <video
      src={url}
      controls
      style={{
        width: "100%",
        aspectRatio,
        borderRadius,
        objectFit: "cover",
      }}
    />
  );
}
