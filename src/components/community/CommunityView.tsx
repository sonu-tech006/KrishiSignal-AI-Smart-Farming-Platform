import React, { useState } from 'react';
import { 
  Users, 
  ThumbsUp, 
  MessageSquare, 
  Plus, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { INITIAL_COMMUNITY_POSTS } from '../../data/mockData';
import { CommunityPost } from '../../types';

export const CommunityView: React.FC = () => {
  const { user, language } = useApp();
  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);

  // New Post Form
  const [showModal, setShowModal] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState<CommunityPost['category']>('Crop Disease');

  const handleUpvote = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) return;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      authorName: user.displayName,
      authorLocation: `${user.district}, UP`,
      title: postTitle,
      content: postContent,
      category: postCategory,
      upvotes: 1,
      repliesCount: 0,
      createdAt: new Date().toISOString()
    };

    setPosts([newPost, ...posts]);
    setShowModal(false);
    setPostTitle('');
    setPostContent('');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* 1. TOP HEADER */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {language === 'hi' ? 'किसान चौपाल — समुदाय चर्चा मंच' : 'Kisan Chaupal — Farmer Community Forum'}
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Moderated
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'hi'
              ? 'साथी किसानों और कृषि वैज्ञानिकों से सवाल पूछें, अनुभव साझा करें और फसल समस्याओं का हल पाएं'
              : 'Ask questions, share field experiences, and receive responses from verified KVK agronomists'}
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md shadow-emerald-700/20 flex items-center gap-1.5 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'hi' ? '+ नया सवाल पूछें' : '+ Ask Community'}</span>
        </button>
      </div>

      {/* 2. POSTS STREAM */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xs text-slate-900">{post.authorName}</span>
                  <span className="text-[10px] text-slate-400">• {post.authorLocation}</span>
                  {post.isVerifiedAgronomistReply && (
                    <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      KVK Verified
                    </span>
                  )}
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mt-1">{post.title}</h3>
              </div>

              <span className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-600 text-[10px] font-bold">
                {post.category}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {post.content}
            </p>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleUpvote(post.id)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 font-bold transition-colors"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{post.upvotes}</span>
                </button>

                <div className="flex items-center gap-1 text-slate-500">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{post.repliesCount} Replies</span>
                </div>
              </div>

              <span className="text-[10px] text-slate-400">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. NEW POST MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setShowModal(false)} 
          />
          <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 z-10 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Ask Question to Kisan Chaupal Community
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Category</label>
                <select
                  value={postCategory}
                  onChange={(e) => setPostCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                >
                  <option value="Crop Disease">Crop Disease & Pests (रोग व कीट)</option>
                  <option value="Mandi Prices">Mandi Prices (मंडी भाव)</option>
                  <option value="Fertilizer Query">Fertilizer & Nutrition (खाद व पोषण)</option>
                  <option value="Organic Farming">Organic & Bio Farming (जैविक खेती)</option>
                  <option value="Machinery">Machinery & Irrigation (मशीनरी व सिंचाई)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Question Title</label>
                <input
                  type="text"
                  required
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="e.g. Yellow rust spots appearing on wheat flag leaves..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Detailed Field Observations</label>
                <textarea
                  rows={4}
                  required
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Mention crop variety, sowing date, soil moisture, and symptoms noticed..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-600 font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20"
                >
                  Publish Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
