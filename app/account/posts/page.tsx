export default function PostsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">My Posts</h1>
        <p className="text-[#a1a1aa] mt-1">Your delivered LinkedIn posts.</p>
      </div>

      <div className="glass-card p-12 text-center">
        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-3">Post history coming soon</h3>
        <p className="text-[#a1a1aa] text-sm max-w-md mx-auto">
          Soon you&apos;ll be able to view all your delivered posts here, request edits, and browse your content history.
        </p>
        <div className="mt-6 badge inline-flex">Coming soon</div>
      </div>
    </div>
  );
}
