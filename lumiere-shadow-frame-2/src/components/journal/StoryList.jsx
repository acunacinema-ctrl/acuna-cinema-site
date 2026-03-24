import React from 'react';
import { Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { format } from 'date-fns';

export default function StoryList({ stories, isLoading, onEdit, onDelete, onTogglePublish }) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-20 bg-parchment/5 animate-pulse" />
        ))}
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="text-center py-24 border border-dashed border-parchment/15">
        <p className="font-display italic font-light text-parchment/30 text-2xl">No stories yet</p>
        <p className="font-interface text-[10px] tracking-editorial uppercase text-parchment/20 mt-3">
          Add your first wedding story above
        </p>
      </div>
    );
  }

  return (
    <div className="border-t border-parchment/10">
      {stories.map((story) => (
        <div key={story.id} className="flex items-center gap-4 py-5 border-b border-parchment/10 group">
          {story.cover_image && (
            <img src={story.cover_image} alt={story.couple_names} className="w-16 h-11 object-cover shrink-0 hidden sm:block" />
          )}
          <div className="flex-1 min-w-0">
            <p className="font-display italic font-light text-parchment text-xl truncate">{story.couple_names}</p>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              {story.venue && (
                <span className="font-interface text-[10px] tracking-editorial uppercase text-parchment/30">{story.venue}</span>
              )}
              {story.location && (
                <span className="font-interface text-[10px] tracking-editorial uppercase text-parchment/30">· {story.location}</span>
              )}
              {story.wedding_date && (
                <span className="font-interface text-[10px] tracking-editorial uppercase text-parchment/20">
                  · {format(new Date(story.wedding_date), 'MMM yyyy')}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className={`font-interface text-[9px] tracking-editorial uppercase px-2 py-1 ${story.published ? 'text-champagne border border-champagne/30' : 'text-parchment/25 border border-parchment/15'}`}>
              {story.published ? 'Live' : 'Draft'}
            </span>
            <button onClick={() => onTogglePublish(story)} className="p-2 text-parchment/30 hover:text-champagne transition-colors" title={story.published ? 'Unpublish' : 'Publish'}>
              {story.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            <button onClick={() => onEdit(story.id)} className="p-2 text-parchment/30 hover:text-champagne transition-colors">
              <Pencil className="w-4 h-4" />
            </button>
            <button onClick={() => onDelete(story.id)} className="p-2 text-parchment/30 hover:text-destructive transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}