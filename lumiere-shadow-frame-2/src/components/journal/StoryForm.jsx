import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Loader2, Plus, X } from 'lucide-react';

export default function StoryForm({ story, onSave, onCancel, isSaving }) {
  const [form, setForm] = useState({
    couple_names: '', venue_id: '', venue_name: '', venue_slug: '',
    location_id: '', location_name: '', location_slug: '',
    wedding_date: '', featured_film_url: '', cover_image: '',
    images: [], story_text: '', published: false,
  });
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const { data: venues = [] } = useQuery({ queryKey: ['venues-all'], queryFn: () => base44.entities.Venue.list('name') });
  const { data: locations = [] } = useQuery({ queryKey: ['locations-all'], queryFn: () => base44.entities.Location.list('name') });

  useEffect(() => { if (story) setForm({ images: [], ...story }); }, [story]);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleVenueChange = (id) => {
    const v = venues.find(v => v.id === id);
    setForm(f => ({ ...f, venue_id: id, venue_name: v?.name || '', venue_slug: v?.slug || '' }));
  };

  const handleLocationChange = (id) => {
    const l = locations.find(l => l.id === id);
    setForm(f => ({ ...f, location_id: id, location_name: l?.name || '', location_slug: l?.slug || '' }));
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    setUploadingCover(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    set('cover_image', file_url); setUploadingCover(false);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    setUploadingImage(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    set('images', [...(form.images || []), file_url]); setUploadingImage(false);
  };

  const removeImage = (idx) => set('images', form.images.filter((_, i) => i !== idx));

  const inputClass = "w-full bg-transparent border border-parchment/20 px-4 py-3 font-narrative text-parchment/80 text-sm placeholder:text-parchment/25 focus:outline-none focus:border-champagne transition-colors";
  const labelClass = "block font-interface text-[10px] tracking-editorial uppercase text-champagne/60 mb-2";
  const selectClass = `${inputClass} cursor-pointer`;

  return (
    <form onSubmit={e => { e.preventDefault(); onSave(form); }} className="space-y-8">

      {/* Couple & Event */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Couple Names *</label>
          <input className={inputClass} placeholder="Sarah & James" value={form.couple_names} onChange={e => set('couple_names', e.target.value)} required />
        </div>
        <div>
          <label className={labelClass}>Wedding Date</label>
          <input type="date" className={inputClass} value={form.wedding_date} onChange={e => set('wedding_date', e.target.value)} />
        </div>

        {/* Venue dropdown */}
        <div>
          <label className={labelClass}>Venue</label>
          <select className={selectClass} value={form.venue_id} onChange={e => handleVenueChange(e.target.value)}>
            <option value="">— Select a venue —</option>
            {venues.map(v => <option key={v.id} value={v.id}>{v.name}{v.city ? ` · ${v.city}` : ''}</option>)}
          </select>
          {form.venue_slug && (
            <p className="font-interface text-[9px] tracking-editorial uppercase text-champagne/40 mt-1">
              Links to /venue/{form.venue_slug}
            </p>
          )}
        </div>

        {/* Location dropdown */}
        <div>
          <label className={labelClass}>Location</label>
          <select className={selectClass} value={form.location_id} onChange={e => handleLocationChange(e.target.value)}>
            <option value="">— Select a location —</option>
            {locations.map(l => <option key={l.id} value={l.id}>{l.name}{l.region ? ` · ${l.region}` : ''}</option>)}
          </select>
          {form.location_slug && (
            <p className="font-interface text-[9px] tracking-editorial uppercase text-champagne/40 mt-1">
              Links to /location/{form.location_slug}
            </p>
          )}
        </div>
      </div>

      {/* Film */}
      <div>
        <label className={labelClass}>Featured Film URL (Vimeo / YouTube embed)</label>
        <input className={inputClass} placeholder="https://player.vimeo.com/video/..." value={form.featured_film_url} onChange={e => set('featured_film_url', e.target.value)} />
      </div>

      {/* Cover Image */}
      <div>
        <label className={labelClass}>Cover Image</label>
        <div className="flex items-start gap-4">
          {form.cover_image && <img src={form.cover_image} alt="Cover" className="w-24 h-16 object-cover shrink-0" />}
          <div className="flex-1">
            <input className={inputClass} placeholder="Paste image URL or upload below" value={form.cover_image} onChange={e => set('cover_image', e.target.value)} />
            <label className="mt-2 inline-block cursor-pointer font-interface text-[10px] tracking-editorial uppercase text-champagne/50 hover:text-champagne transition-colors border border-parchment/15 px-4 py-2">
              {uploadingCover ? <Loader2 className="w-3 h-3 animate-spin inline" /> : 'Upload File'}
              <input type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
            </label>
          </div>
        </div>
      </div>

      {/* Additional Images */}
      <div>
        <label className={labelClass}>Additional Images</label>
        <div className="flex flex-wrap gap-3 mb-3">
          {(form.images || []).map((url, i) => (
            <div key={i} className="relative group">
              <img src={url} alt="" className="w-20 h-14 object-cover" />
              <button type="button" onClick={() => removeImage(i)} className="absolute -top-2 -right-2 bg-background border border-parchment/20 rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <X className="w-3 h-3 text-parchment/60" />
              </button>
            </div>
          ))}
          <label className="w-20 h-14 border border-dashed border-parchment/20 flex items-center justify-center cursor-pointer hover:border-champagne transition-colors">
            {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin text-champagne/40" /> : <Plus className="w-4 h-4 text-parchment/20" />}
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
          </label>
        </div>
      </div>

      {/* Story Text */}
      <div>
        <label className={labelClass}>Story Text</label>
        <textarea className={`${inputClass} h-48 resize-y`} placeholder="Write the couple's wedding story..." value={form.story_text} onChange={e => set('story_text', e.target.value)} />
      </div>

      {/* Published */}
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => set('published', !form.published)} className={`w-10 h-5 rounded-full transition-colors relative ${form.published ? 'bg-champagne' : 'bg-parchment/15'}`}>
          <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-background transition-transform ${form.published ? 'translate-x-5' : 'translate-x-0.5'}`} />
        </button>
        <span className="font-interface text-[10px] tracking-editorial uppercase text-parchment/50">{form.published ? 'Published' : 'Draft'}</span>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-parchment/10">
        <button type="submit" disabled={isSaving} className="font-interface text-[10px] tracking-editorial uppercase text-primary-foreground bg-champagne px-8 py-3 hover:bg-parchment transition-colors disabled:opacity-50 flex items-center gap-2">
          {isSaving && <Loader2 className="w-3 h-3 animate-spin" />} Save Story
        </button>
        <button type="button" onClick={onCancel} className="font-interface text-[10px] tracking-editorial uppercase text-parchment/40 hover:text-parchment transition-colors">Cancel</button>
      </div>
    </form>
  );
}