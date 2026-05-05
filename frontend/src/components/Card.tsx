// import React from 'react';
import { ShareIcon } from '../icons/ShareIcon';
import { YoutubeIcon } from '../icons/Youtube';
import { TwitterIcon } from '../icons/Twitter';

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
  return url.replace('x.com', 'twitter.com');
}

export function Card({ id, title, link, type, description, onDelete, deleting = false }: CardProps) {
  return (
    <div className="w-full max-w-80">
      <div className="p-4 bg-white rounded-md shadow-md border border-slate-100 min-h-32 min-w-32 hover:shadow-lg transition-shadow">
        <div className="flex justify-between">
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
              src={link.replace('watch?v=', 'embed/')}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}

          {type === 'twitter' && (
            <blockquote className="twitter-tweet">
              <a href={twitterToTwitterCom(link)}></a>
            </blockquote>
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
