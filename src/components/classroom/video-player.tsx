"use client"

import { useEffect, useRef, useState } from 'react';
import type { Lesson } from '@/types/classroom';

interface VideoPlayerProps {
  lesson: Lesson;
  onTimeUpdate?: (time: number) => void;
}

export function VideoPlayer({ lesson, onTimeUpdate }: VideoPlayerProps) {
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const playerRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!lesson.videoUrl) return;

    // Handle different video platforms
    if (lesson.videoUrl.includes('youtube.com') || lesson.videoUrl.includes('youtu.be')) {
      const videoId = extractYouTubeId(lesson.videoUrl);
      if (videoId) {
        setEmbedUrl(`https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${window.location.origin}&start=${lesson.lastPosition || 0}`);
      }
    } else if (lesson.videoUrl.includes('vimeo.com')) {
      const videoId = extractVimeoId(lesson.videoUrl);
      if (videoId) {
        setEmbedUrl(`https://player.vimeo.com/video/${videoId}?h=${lesson.lastPosition || 0}`);
      }
    } else if (lesson.videoUrl.includes('loom.com')) {
      const videoId = extractLoomId(lesson.videoUrl);
      if (videoId) {
        setEmbedUrl(`https://www.loom.com/embed/${videoId}`);
      }
    }
  }, [lesson.videoUrl, lesson.lastPosition]);

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    let player: any;

    // Initialize YouTube player when API is ready
    (window as any).onYouTubeIframeAPIReady = () => {
      if (!playerRef.current) return;

      player = new (window as any).YT.Player(playerRef.current, {
        events: {
          onStateChange: (event: any) => {
            setIsPlaying(event.data === (window as any).YT.PlayerState.PLAYING);
            if (event.data === (window as any).YT.PlayerState.PLAYING) {
              // Start time tracking when video plays
              const trackTime = setInterval(() => {
                if (player && onTimeUpdate) {
                  onTimeUpdate(player.getCurrentTime());
                }
              }, 5000); // Update every 5 seconds

              return () => clearInterval(trackTime);
            }
          }
        }
      });
    };

    return () => {
      // Cleanup
      if (player) {
        player.destroy();
      }
    };
  }, [onTimeUpdate]);

  if (!embedUrl) {
    return null;
  }

  return (
    <div className="aspect-video rounded-lg overflow-hidden border shadow-md bg-black">
      <iframe
        ref={playerRef}
        width="100%"
        height="100%"
        src={embedUrl}
        title="Video Player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

// Utility functions to extract video IDs
function extractYouTubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

function extractVimeoId(url: string): string | null {
  const regExp = /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

function extractLoomId(url: string): string | null {
  const regExp = /loom\.com\/(share|embed)\/([a-zA-Z0-9]+)/i;
  const match = url.match(regExp);
  return match ? match[2] : null;
} 