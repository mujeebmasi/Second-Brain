import { useEffect, useRef } from 'react';
import { ShareIcon } from '../icons/ShareIcon';
import { YoutubeIcon } from '../icons/Youtube';
import { TwitterIcon } from '../icons/Twitter';

declare global {
  interface Window {
    twttr?: {
      widgets?: {
        load: (element?: HTMLElement) => void;
      };
    };
  }
}

interface CardProps {
  id?: string;
  title: string;
  link: string;
  type: 'twitter' | 'youtube' | 'text';
  description?: string;
  onDelete?: (id: string) => void;
  deleting?: boolean;
}

function twitterToTwitterCom(url: string) {
  try {
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname.replace('www.', '').replace('mobile.', '');

    if (host === 'x.com' || host === 'twitter.com') {
      parsedUrl.hostname = 'twitter.com';
      return parsedUrl.toString();
    }
  } catch {
    // Fall back to simple string replacement below.
  }

  return url.replace('x.com', 'twitter.com');
}

function getYouTubeEmbedUrl(url: string) {
  try {
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname.replace('www.', '');

    if (host === 'youtu.be') {
      const videoId = parsedUrl.pathname.split('/').filter(Boolean)[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }

    if (host.includes('youtube.com')) {
      if (parsedUrl.pathname.startsWith('/embed/')) {
        return url;
      }

      const videoId = parsedUrl.searchParams.get('v');
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }

      const shortsMatch = parsedUrl.pathname.match(/\/shorts\/([^/]+)/);
      if (shortsMatch?.[1]) {
        return `https://www.youtube.com/embed/${shortsMatch[1]}`;
      }
    }
  } catch {
    // Fall back to the original URL below.
  }

  return url.replace('watch?v=', 'embed/');
}

export function Card({ id, title, link, type, description, onDelete, deleting = false }: CardProps) {
  const twitterEmbedRef = useRef<HTMLQuoteElement | null>(null);

  useEffect(() => {
    if (type !== 'twitter') {
      return;
    }

    const loadWidgets = () => {
      window.twttr?.widgets?.load(twitterEmbedRef.current || undefined);
    };

    if (window.twttr?.widgets?.load) {
      loadWidgets();
      return;
    }

    const script = document.querySelector(
      'script[src="https://platform.twitter.com/widgets.js"]',
    ) as HTMLScriptElement | null;

    if (script) {
      script.addEventListener('load', loadWidgets, { once: true });
      return () => script.removeEventListener('load', loadWidgets);
    }

    const newScript = document.createElement('script');
    newScript.src = 'https://platform.twitter.com/widgets.js';
    newScript.async = true;
    newScript.charset = 'utf-8';
    newScript.addEventListener('load', loadWidgets, { once: true });
    document.head.appendChild(newScript);

    return () => {
      newScript.removeEventListener('load', loadWidgets);
    };
  }, [type, link]);

  return (
    <div className="w-full max-w-80">
      <div className="min-h-32 min-w-32 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-lg">
        <div className="flex justify-between gap-3">
          <div className="flex items-center text-md">
            <div className="text-gray-500 items-center pr-2">
              <a href={link} target="_blank" rel="noreferrer">
                <ShareIcon />
              </a>
            </div>
            {title}
          </div>
          <div className="flex items-center">
            <div className="text-gray-500">{type === 'youtube' ? <YoutubeIcon /> : type === 'twitter' ? <TwitterIcon /> : null}</div>
            {onDelete && id && (
              <button
                type="button"
                onClick={() => onDelete(id)}
                disabled={deleting}
                className="ml-3 text-xs px-2 py-1 rounded bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-60"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            )}
          </div>
        </div>

        <div className="pt-4">
        
          {type === 'youtube' && (
            <iframe
              className="w-full"
              src={getYouTubeEmbedUrl(link)}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}

          {type === 'twitter' && (
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-3 shadow-sm">
              <blockquote ref={twitterEmbedRef} className="twitter-tweet">
                <a href={twitterToTwitterCom(link)}></a>
              </blockquote>
            </div>
          )}

          {type === 'text' && (
            <p className="text-sm leading-6 text-slate-700 whitespace-pre-wrap">
              {description || 'No description provided.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
