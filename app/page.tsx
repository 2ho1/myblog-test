import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto px-6 py-16 max-w-4xl">
        {/* Header */}
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            최근 글
          </h1>
          <p className="text-lg text-muted-foreground">
            새로 작성된 글들을 확인해보세요
          </p>
        </header>

        {/* Main Content */}
        <div>
          
          {posts.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground">
              <p className="text-base">아직 작성된 글이 없습니다.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {posts.map((post) => (
                <Link 
                  key={`${post.category}-${post.slug}`}
                  href={`/posts/${post.category}/${post.slug}`}
                  className="block group"
                >
                  <article className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-border/60 transition-all duration-300 group-hover:scale-[1.02]">
                    <div className="space-y-4">
                      {/* Header with date and category */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <time 
                            dateTime={post.date ? new Date(post.date).toISOString() : ''}
                            className="text-sm text-muted-foreground font-mono tabular-nums"
                          >
                            {post.date && new Date(post.date).toLocaleDateString('ko-KR', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit'
                            }).replace(/\./g, '.').replace(/\s/g, '')}
                          </time>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-sm text-primary font-medium">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors leading-tight">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="text-muted-foreground leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs bg-muted/50 text-muted-foreground rounded-full hover:bg-muted transition-colors"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
