import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Pencil, Trash2, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const inputClass = "w-full bg-transparent border border-parchment/20 px-4 py-3 font-narrative text-parchment/80 text-sm placeholder:text-parchment/25 focus:outline-none focus:border-champagne transition-colors";
const labelClass = "block font-interface text-[10px] tracking-editorial uppercase text-champagne/60 mb-2";

function VenueForm({ venue, onSave, onCancel, isSaving }) {
  const [form, setForm] = useState({ name: '', slug: '', city: '', state: 'Michigan', cover_image: '', gallery_images: [], film_url: '', description: '', published: false, ...venue });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const autoSlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return (
    <form onSubmit={e => { e.preventDefault(); onSave(form); }} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Venue Name *</label>
          <input className={inputClass} value={form.name} onChange={e => { set('name', e.target.value); if (!venue) set('slug', autoSlug(e.target.value)); }} required />
        </div>
        <div>
          <label className={labelClass}>URL Slug *</label>
          <input className={inputClass} value={form.slug} onChange={e => set('slug', e.target.value)} required placeholder="the-felt-estate" />
        </div>
        <div>
          <label className={labelClass}>City</label>
          <input className={inputClass} value={form.city} onChange={e => set('city', e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>State</label>
          <input className={inputClass} value={form.state} onChange={e => set('state', e.target.value)} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Cover Image URL</label>
        <input className={inputClass} value={form.cover_image} onChange={e => set('cover_image', e.target.value)} />
      </div>
      <div>
        <label className={labelClass}>Gallery Images (up to 3 URLs, one per line)</label>
        <textarea
          className={`${inputClass} h-24 resize-y`}
          placeholder="https://...&#10;https://...&#10;https://..."
          value={(form.gallery_images || []).join('\n')}
          onChange={e => set('gallery_images', e.target.value.split('\n').map(s => s.trim()).filter(Boolean).slice(0, 3))}
        />
      </div>
      <div>
        <label className={labelClass}>Featured Film URL (Vimeo / YouTube embed)</label>
        <input className={inputClass} placeholder="https://player.vimeo.com/video/..." value={form.film_url} onChange={e => set('film_url', e.target.value)} />
      </div>
      <div>
        <label className={labelClass}>Description</label>
        <textarea className={`${inputClass} h-32 resize-y`} value={form.description} onChange={e => set('description', e.target.value)} />
      </div>
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => set('published', !form.published)} className={`w-10 h-5 rounded-full transition-colors relative ${form.published ? 'bg-champagne' : 'bg-parchment/15'}`}>
          <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-background transition-transform ${form.published ? 'translate-x-5' : 'translate-x-0.5'}`} />
        </button>
        <span className="font-interface text-[10px] tracking-editorial uppercase text-parchment/50">{form.published ? 'Published' : 'Draft'}</span>
      </div>
      <div className="flex gap-4 pt-4 border-t border-parchment/10">
        <button type="submit" disabled={isSaving} className="font-interface text-[10px] tracking-editorial uppercase text-primary-foreground bg-champagne px-8 py-3 hover:bg-parchment transition-colors disabled:opacity-50 flex items-center gap-2">
          {isSaving && <Loader2 className="w-3 h-3 animate-spin" />} Save Venue
        </button>
        <button type="button" onClick={onCancel} className="font-interface text-[10px] tracking-editorial uppercase text-parchment/40 hover:text-parchment transition-colors">Cancel</button>
      </div>
    </form>
  );
}

export default function VenueAdmin() {
  const [editing, setEditing] = useState(null);
  const qc = useQueryClient();
  const { data: venues = [], isLoading } = useQuery({ queryKey: ['venues-admin'], queryFn: () => base44.entities.Venue.list('-created_date') });
  const create = useMutation({ mutationFn: d => base44.entities.Venue.create(d), onSuccess: () => { qc.invalidateQueries(['venues-admin']); setEditing(null); } });
  const update = useMutation({ mutationFn: ({ id, d }) => base44.entities.Venue.update(id, d), onSuccess: () => { qc.invalidateQueries(['venues-admin']); setEditing(null); } });
  const del = useMutation({ mutationFn: id => base44.entities.Venue.delete(id), onSuccess: () => qc.invalidateQueries(['venues-admin']) });
  const toggle = (v) => update.mutate({ id: v.id, d: { ...v, published: !v.published } });
  const editingVenue = editing && editing !== 'new' ? venues.find(v => v.id === editing) : null;

  return (
    <div className="min-h-screen bg-background text-foreground px-6 md:px-12 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="font-interface text-[10px] tracking-editorial uppercase text-champagne mb-2">Admin</p>
            <h1 className="font-display italic font-light text-parchment text-3xl md:text-5xl">Venues</h1>
          </div>
          <div className="flex gap-4">
            <Link to="/JournalAdmin" className="font-interface text-[10px] tracking-editorial uppercase text-parchment/40 hover:text-champagne transition-colors border border-parchment/15 px-4 py-2">Journal</Link>
            {editing ? (
              <button onClick={() => setEditing(null)} className="font-interface text-[10px] tracking-editorial uppercase text-parchment/50 hover:text-champagne transition-colors border border-parchment/20 px-4 py-2">← Back</button>
            ) : (
              <button onClick={() => setEditing('new')} className="font-interface text-[10px] tracking-editorial uppercase text-primary-foreground bg-champagne px-6 py-3 hover:bg-parchment transition-colors">+ New Venue</button>
            )}
          </div>
        </div>
        {editing ? (
          <VenueForm venue={editingVenue} onSave={d => editing === 'new' ? create.mutate(d) : update.mutate({ id: editing, d })} onCancel={() => setEditing(null)} isSaving={create.isPending || update.isPending} />
        ) : isLoading ? <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-14 bg-parchment/5 animate-pulse" />)}</div> : (
          <div className="border-t border-parchment/10">
            {venues.length === 0 && <p className="font-display italic text-parchment/30 text-xl py-16 text-center">No venues yet</p>}
            {venues.map(v => (
              <div key={v.id} className="flex items-center gap-4 py-4 border-b border-parchment/10 group">
                <div className="flex-1 min-w-0">
                  <p className="font-display italic font-light text-parchment text-xl">{v.name}</p>
                  <p className="font-interface text-[10px] tracking-editorial uppercase text-parchment/30 mt-1">{[v.city, v.state].filter(Boolean).join(', ')} · /venue/{v.slug}</p>
                </div>
                <span className={`font-interface text-[9px] tracking-editorial uppercase px-2 py-1 shrink-0 ${v.published ? 'text-champagne border border-champagne/30' : 'text-parchment/25 border border-parchment/15'}`}>{v.published ? 'Live' : 'Draft'}</span>
                <button onClick={() => toggle(v)} className="p-2 text-parchment/30 hover:text-champagne transition-colors">{v.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                <button onClick={() => setEditing(v.id)} className="p-2 text-parchment/30 hover:text-champagne transition-colors"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => del.mutate(v.id)} className="p-2 text-parchment/30 hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}