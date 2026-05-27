'use client';
import  { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ChevronUp, MessageSquare, Lock, Send, User, Heart } from 'lucide-react';
import type { Session, Question, SessionStatus } from '@/lib/mock-data';

interface SessionQnAProps {
  session: Session;
  status: SessionStatus;
}

interface QuestionFormValues {
  content: string;
  author: string;
}

interface QuestionWithVote extends Question {
  hasVoted: boolean;
  localVotes: number;
  likes: number;
  hasLiked: boolean;
}

export default function SessionQnA({ session, status }: SessionQnAProps) {
  const [questions, setQuestions] = useState<QuestionWithVote[]>(
    [...session.questions]
      .sort((a, b) => b.upvotes - a.upvotes)
      .map((q) => ({ ...q, hasVoted: false, localVotes: q.upvotes, likes: 0, hasLiked: false }))
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<QuestionFormValues>();

  const handleUpvote = (questionId: string) => {
    setQuestions((prev) =>
      prev
        .map((q) =>
          q.id === questionId
            ? { ...q, hasVoted: !q.hasVoted, localVotes: q.hasVoted ? q.localVotes - 1 : q.localVotes + 1 }
            : q
        )
        .sort((a, b) => b.localVotes - a.localVotes)
    );
  };

  const handleLike = (questionId: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? { ...q, hasLiked: !q.hasLiked, likes: q.hasLiked ? q.likes - 1 : q.likes + 1 }
          : q
      )
    );
  };

  const onSubmit = async (data: QuestionFormValues) => {
    setIsSubmitting(true);
    // Backend integration point: POST /api/sessions/{session.id}/questions
    await new Promise((r) => setTimeout(r, 800));

    const newQuestion: QuestionWithVote = {
      id: `q-new-${Date.now()}`,
      content: data.content,
      author: data.author || null,
      upvotes: 0,
      localVotes: 0,
      hasVoted: false,
      likes: 0,
      hasLiked: false,
      sessionId: session.id,
      createdAt: new Date().toISOString(),
    };

    setQuestions((prev) => [newQuestion, ...prev]);
    reset();
    setIsSubmitting(false);
    toast.success('Your question has been submitted!');
  };

  if (status === 'upcoming') {
    return (
      <div className="glass-card p-8 text-center">
        <div className="w-14 h-14 rounded-2xl bg-slate-800/50 border border-white/[0.07] flex items-center justify-center mx-auto mb-4">
          <Lock size={22} className="text-slate-500" />
        </div>
        <h3 className="font-display text-base font-bold text-white mb-2">Q&A Not Open Yet</h3>
        <p className="text-sm text-slate-500 max-w-xs mx-auto">
          The Q&A section will be available once this session goes live. Check back at{' '}
          <span className="font-mono text-sky-400 tabular-nums">
            {new Date(session.startTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
          </span>.
        </p>
      </div>
    );
  }

  if (status === 'ended') {
    return (
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-xl bg-slate-800/50 border border-white/[0.07] flex items-center justify-center">
            <MessageSquare size={15} className="text-slate-500" />
          </div>
          <div>
            <h3 className="font-display text-sm font-bold text-white">Session Q&A — Archived</h3>
            <p className="text-xs text-slate-500">{questions.length} questions submitted</p>
          </div>
          <span className="ml-auto text-xs px-2.5 py-1 rounded-full bg-slate-700/40 text-slate-500 border border-slate-700/50">
            Ended
          </span>
        </div>

        <div className="space-y-3">
          {questions.map((q) => (
            <QuestionCard key={`qcard-${q.id}`} question={q} onUpvote={() => {}} onLike={() => {}} readonly />
          ))}
        </div>

        {questions.length === 0 && (
          <p className="text-sm text-slate-600 text-center py-4">No questions were submitted during this session.</p>
        )}
      </div>
    );
  }

  // Live state
  return (
    <div className="glass-card-live p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
          <MessageSquare size={15} className="text-emerald-400" />
        </div>
        <div>
          <h3 className="font-display text-sm font-bold text-white">Live Q&A</h3>
          <p className="text-xs text-emerald-400">{questions.length} questions · sorted by votes</p>
        </div>
        <span className="ml-auto live-badge animate-glow-pulse">
          <span className="live-dot" />
          OPEN
        </span>
      </div>

      {/* Submit form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-6 p-4 rounded-xl bg-white/[0.03] border border-white/[0.07]">
        <div className="mb-3">
          <label htmlFor="question-content" className="block text-xs font-semibold text-slate-300 mb-1.5">
            Your Question <span className="text-red-400">*</span>
          </label>
          <textarea
            id="question-content"
            rows={3}
            placeholder="What would you like to ask?"
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/30 transition-all duration-200 resize-none"
            {...register('content', { required: 'Please enter your question' })}
          />
          {errors.content && (
            <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
              <span>⚠</span> {errors.content.message}
            </p>
          )}
        </div>

        <div className="flex items-end gap-3">
          <div className="flex-1">
            <label htmlFor="question-author" className="block text-xs font-semibold text-slate-400 mb-1.5">
              Your Name <span className="text-slate-600">(optional — leave blank to post anonymously)</span>
            </label>
            <div className="relative">
              <User size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
              <input
                id="question-author"
                type="text"
                placeholder="Anonymous"
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-8 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/30 transition-all duration-200"
                {...register('author')}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary flex-shrink-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            style={{ minWidth: 120 }}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin" width={15} height={15} viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeDashoffset="45" />
                </svg>
                Submitting
              </>
            ) : (
              <>
                <Send size={14} />
                Ask Question
              </>
            )}
          </button>
        </div>
      </form>

      {/* Questions list */}
      <div className="space-y-3">
        {questions.map((q, idx) => (
          <QuestionCard
            key={`qcard-${q.id}`}
            question={q}
            onUpvote={() => handleUpvote(q.id)}
            onLike={() => handleLike(q.id)}
            rank={idx + 1}
          />
        ))}
      </div>

      {questions.length === 0 && (
        <div className="text-center py-8">
          <MessageSquare size={32} className="mx-auto text-slate-700 mb-3" />
          <p className="text-sm text-slate-500">No questions yet — be the first to ask!</p>
        </div>
      )}
    </div>
  );
}

interface QuestionCardProps {
  question: QuestionWithVote;
  onUpvote: () => void;
  onLike: () => void;
  rank?: number;
  readonly?: boolean;
}

function QuestionCard({ question, onUpvote, onLike, rank, readonly = false }: QuestionCardProps) {
  const timeAgo = (() => {
    const diff = (new Date(new Date('2026-04-26T10:45:00')).getTime() - new Date(question.createdAt).getTime()) / 1000 / 60;
    if (diff < 1) return 'just now';
    return `${Math.round(diff)}m ago`;
  })();

  return (
    <div className={`question-card ${question.hasVoted ? 'border-sky-500/20' : ''}`}>
      {/* Upvote */}
      <div className="flex-shrink-0">
        <button
          onClick={readonly ? undefined : onUpvote}
          disabled={readonly}
          className={`upvote-btn ${question.hasVoted ? 'upvoted' : ''} ${readonly ? 'cursor-default' : ''}`}
          aria-label={`Upvote this question (${question.localVotes} votes)`}
          aria-pressed={question.hasVoted}
        >
          <ChevronUp size={16} />
          <span className="text-xs font-bold tabular-nums">{question.localVotes}</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {rank === 1 && !readonly && (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400 mb-1.5">
            🏆 Top Question
          </span>
        )}
        <p className="text-sm text-slate-200 leading-relaxed">{question.content}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs text-slate-500">
            {question.author ? (
              <span className="flex items-center gap-1">
                <User size={10} />
                {question.author}
              </span>
            ) : (
              'Anonymous'
            )}
          </span>
          <span className="text-slate-700">·</span>
          <span className="text-xs text-slate-600">{timeAgo}</span>
        </div>
      </div>

      {/* Like */}
      <div className="flex-shrink-0 ml-2">
        <button
          onClick={readonly ? undefined : onLike}
          disabled={readonly}
          className={`like-btn ${question.hasLiked ? 'liked' : ''} ${readonly ? 'cursor-default' : ''}`}
          aria-label={`Like this question (${question.likes} likes)`}
          aria-pressed={question.hasLiked}
        >
          <Heart
            size={15}
            fill={question.hasLiked ? 'currentColor' : 'none'}
          />
          <span className="text-xs font-bold tabular-nums">{question.likes}</span>
        </button>
      </div>
    </div>
  );
}
