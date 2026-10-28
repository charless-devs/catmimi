import { useEffect, useRef } from 'react';

const VIDEO_URL = '/bg-video.mp4';
const SENSITIVITY = 0.8;

/**
 * Signature mouse-scrubbed background film.
 * Moving the pointer horizontally scrubs through the video timeline,
 * turning the cursor into a playback head. Renders inside the hero.
 */
export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef(0);
  const isSeekingRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const seekToTarget = () => {
      const v = videoRef.current;
      if (!v) return;

      const currentTime = v.currentTime;
      const targetTime = targetTimeRef.current;

      if (Math.abs(currentTime - targetTime) < 0.05) {
        isSeekingRef.current = false;
        return;
      }

      isSeekingRef.current = true;
      v.currentTime = targetTime;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const v = videoRef.current;
      if (!v || !v.duration) return;

      const currentX = e.clientX;
      if (prevXRef.current === null) {
        prevXRef.current = currentX;
        return;
      }

      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;
      if (delta === 0) return;

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * v.duration;
      targetTimeRef.current = Math.max(0, Math.min(v.duration, targetTimeRef.current + timeOffset));

      if (!isSeekingRef.current) seekToTarget();
    };

    const handleSeeked = () => {
      const v = videoRef.current;
      if (!v) return;
      if (Math.abs(v.currentTime - targetTimeRef.current) > 0.05) {
        seekToTarget();
      } else {
        isSeekingRef.current = false;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    video.addEventListener('seeked', handleSeeked);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={VIDEO_URL}
      muted
      loop
      playsInline
      preload="auto"
      className="absolute inset-0 h-full w-full object-cover opacity-[0.55]"
      style={{ objectPosition: '70% center', filter: 'saturate(1.05) contrast(1.02)' }}
      aria-hidden="true"
    />
  );
}
