import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostsByCategory, getAllCategories } from '@/lib/posts';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface Props {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    category,
  }));
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const posts = getPostsByCategory(category);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="bg-background">
      <div className="mx-auto px-6 py-16 max-w-4xl">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          뒤로
        </Link>

        {/* Category Header */}
        <header className="mb-16">
          <h1 className="text-5xl font-bold mb-4 tracking-tight">{category}</h1>
          <p className="text-muted-foreground">총 {posts.length}개의 글</p>
        </header>

        {/* Posts List */}
        <div className="grid gap-6">
          {posts.map((post) => (
            <Link 
              key={post.slug}
              href={`/posts/${post.category}/${post.slug}`}
              className="block group"
            >
              <article className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-border/60 transition-all duration-300 group-hover:scale-[1.02]">
                <div className="space-y-4">
                  {/* Header with date and category */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <time 
                        dateTime={post.date}
                        className="text-sm text-muted-foreground font-mono tabular-nums"
                      >
                        {post.date && format(new Date(post.date), 'yyyy.MM.dd', { locale: ko })}
                      </time>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-sm text-primary font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-semibold group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                  </h2>

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
      </div>
    </div>
  );
}

