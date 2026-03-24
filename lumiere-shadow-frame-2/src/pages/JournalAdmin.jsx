import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import StoryForm from '../components/journal/StoryForm';
import StoryList from '../components/journal/StoryList';

export default function JournalAdmin() {
  const [editing, setEditing] = useState(null); // null = list, 'new' = new form, id = edit form
  const queryClient = useQueryClient();

  const { data: stories = [], isLoading } = useQuery({
    queryKey: ['journal-stories'],
    queryFn: () => base44.entities.JournalStory.list('-created_date'),
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.JournalStory.create(data),
    onSuccess: () => { queryClient.invalidateQueries(['journal-stories']); setEditing(null); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.JournalStory.update(id, data),
    onSuccess: () => { queryClient.invalidateQueries(['journal-stories']); setEditing(null); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.JournalStory.delete(id),
    onSuccess: () => queryClient.invalidateQueries(['journal-stories']),
  });

  const handleSave = (data) => {
    if (editing === 'new') {
      createMutation.mutate(data);
    } else {
      updateMutation.mutate({ id: editing, data });
    }
  };

  const editingStory = editing && editing !== 'new'
    ? stories.find(s => s.id === editing)
    : null;

  return (
    <div className="min-h-screen bg-background text-foreground px-6 md:px-12 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="font-interface text-[10px] tracking-editorial uppercase text-champagne mb-2">Admin</p>
            <h1 className="font-display italic font-light text-parchment text-3xl md:text-5xl">The Journal</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/VenueAdmin" className="font-interface text-[10px] tracking-editorial uppercase text-parchment/40 hover:text-champagne transition-colors border border-parchment/15 px-4 py-2">Venues</Link>
            <Link to="/LocationAdmin" className="font-interface text-[10px] tracking-editorial uppercase text-parchment/40 hover:text-champagne transition-colors border border-parchment/15 px-4 py-2">Locations</Link>
            {editing ? (
              <button onClick={() => setEditing(null)} className="font-interface text-[10px] tracking-editorial uppercase text-parchment/50 hover:text-champagne transition-colors border border-parchment/20 px-4 py-2">← Back</button>
            ) : (
              <button onClick={() => setEditing('new')} className="font-interface text-[10px] tracking-editorial uppercase text-primary-foreground bg-champagne px-6 py-3 hover:bg-parchment transition-colors">+ New Story</button>
            )}
          </div>
        </div>

        {editing ? (
          <StoryForm
            story={editingStory}
            onSave={handleSave}
            onCancel={() => setEditing(null)}
            isSaving={createMutation.isPending || updateMutation.isPending}
          />
        ) : (
          <StoryList
            stories={stories}
            isLoading={isLoading}
            onEdit={(id) => setEditing(id)}
            onDelete={(id) => deleteMutation.mutate(id)}
            onTogglePublish={(story) => updateMutation.mutate({ id: story.id, data: { ...story, published: !story.published } })}
          />
        )}
      </div>
    </div>
  );
}