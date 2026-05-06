import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { ShareIcon } from '../icons/ShareIcon';
import { PlusIcon } from '../icons/PlusIcon';
import { Card } from '../components/Card';
import { CreateContentModel } from '../components/CreateContentModel';
import { Sidebar, type ContentFilter } from '../components/Sidebar';
import { createShareLink, deleteContent, fetchContent, type ContentItem } from '../lib/api';

export function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [filter, setFilter] = useState<ContentFilter>('all');
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [shareLink, setShareLink] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem('sb_token')));

  const loadContent = () => {
    const token = localStorage.getItem('sb_token');
    setIsAuthenticated(Boolean(token));
    if (!token) {
      setContent([]);
      return;
    }

    setLoading(true);
    setError('');

    fetchContent(token)
      .then((response) => setContent(response.content))
      .catch((apiError: Error) => setError(apiError.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadContent();
  }, []);

  const handleDelete = (contentId: string) => {
    const token = localStorage.getItem('sb_token');
    if (!token) {
      setError('Please sign in first.');
      return;
    }

    setDeletingId(contentId);
    setError('');

    deleteContent(token, contentId)
      .then(() => loadContent())
      .catch((apiError: Error) => setError(apiError.message))
      .finally(() => setDeletingId(null));
  };

  const handleLogout = () => {
    localStorage.removeItem('sb_token');
    setIsAuthenticated(false);
    setShareLink('');
    setContent([]);
    setError('');
    window.location.href = '/signin';
  };

  const visibleCards =
    filter === 'all'
      ? content
      : content.filter((item) => item.type === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      <CreateContentModel open={modelOpen} onClose={() => setModelOpen(false)} onCreated={loadContent} />
      <Sidebar
        selectedFilter={filter}
        onFilterChange={(next) => {
          setFilter(next);
          setMobileSidebarOpen(false);
        }}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />

      <div className="md:ml-64 container mx-auto px-4 py-6 md:py-8">
        <header className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden px-3 py-2 rounded-md border border-slate-300 bg-white"
              onClick={() => setMobileSidebarOpen(true)}
            >
              Menu
            </button>
            <h1 className="text-3xl font-bold">Second Brain</h1>
          </div>
          <div className="flex gap-3">
            <Button
              variant="primary"
              text="Add Content"
              startIcon={<PlusIcon />}
              onClick={() => setModelOpen(true)}
            />
            <Button
              variant="secondary"
              text="Share Brain"
              startIcon={<ShareIcon />}
              onClick={() => {
                const token = localStorage.getItem('sb_token');
                if (!token) {
                  setError('Please sign in first.');
                  return;
                }

                createShareLink(token)
                  .then(({ shareLink: tokenValue }) => setShareLink(`${window.location.origin}/share/${tokenValue}`))
                  .catch((apiError: Error) => setError(apiError.message));
              }}
            />
          </div>
        </header>

        <main>
          {error && <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</div>}
          {shareLink && <div className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-2 break-all">Share link: {shareLink}</div>}
          <div className="mb-4 text-sm text-slate-500">
            {loading ? 'Loading content...' : `Showing ${visibleCards.length} item${visibleCards.length === 1 ? '' : 's'}`}
          </div>
          <div className="flex gap-4 flex-wrap">
            {visibleCards.map((card) => (
              <Card
                key={card.id}
                id={card.id}
                type={(card.type || 'text') as 'twitter' | 'youtube' | 'text'}
                link={card.link}
                title={card.title}
                description={card.description}
                onDelete={handleDelete}
                deleting={deletingId === card.id}
              />
            ))}
            {visibleCards.length === 0 && (
              <div className="w-full p-8 rounded-lg border border-dashed border-slate-300 bg-white text-center text-slate-500">
                {localStorage.getItem('sb_token') ? 'No content available for this filter.' : 'Sign in to load your saved content.'}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
// test
// test
// test