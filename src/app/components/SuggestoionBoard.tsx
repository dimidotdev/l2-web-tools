'use client';

import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Suggestion } from '../types/suggestion';
import 'dotenv/config';

export default function SuggestionBoard() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [newSuggestion, setNewSuggestion] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSuggestions();
  }, []);

  const loadSuggestions = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/suggestions`);
      if (!response.ok) throw new Error('Failed to load suggestions');
      const data = await response.json();
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error('Error loading suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSuggestion.trim()) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/suggestions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newSuggestion }),
      });

      if (!response.ok) throw new Error('Failed to add suggestion');
      const data = await response.json();
      setSuggestions([data.suggestion, ...suggestions]);
      setNewSuggestion('');
    } catch (error) {
      console.error('Error adding suggestion:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Feature or improvement suggestion</h2>
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-2">
            <textarea
              value={newSuggestion}
              onChange={(e) => setNewSuggestion(e.target.value)}
              placeholder="Share with us your suggestion..."
              className="flex-1 p-3 border rounded-lg resize-none h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              maxLength={280}
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">
              {280 - newSuggestion.length} characters left
            </span>
            <button
              type="submit"
              disabled={!newSuggestion.trim()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors duration-200"
            >
              Send
            </button>
          </div>
        </form>
        <div className="max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {isLoading ? (
            <div className="text-center py-4">Loading...</div>
          ) : suggestions.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No suggestion yet. Be the first one to contribute to our system!
            </div>
          ) : (
            <div className="space-y-4">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">
                      {suggestion.authorName[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{suggestion.authorName}</p>
                      <p className="text-gray-600 mt-1 break-words">{suggestion.content}</p>
                      <div className="mt-2 text-sm text-gray-500">
                        {formatDistanceToNow(new Date(suggestion.createdAt), {
                          addSuffix: true,
                          locale: enUS,
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}