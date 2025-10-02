import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostData, getAllPostPaths } from '@/lib/posts';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface Props {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const paths = getAllPostPaths();
  return paths.map((path) => ({
    category: path.category,
    slug: path.slug,
  }));
}

export default async function PostPage({ params }: Props) {
  const { category, slug } = await params;
  const post = await getPostData(category, slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-background">
      <div className="mx-auto px-6 py-16 max-w-3xl">
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

        {/* Post Header */}
        <article>
          <header className="mb-12">
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6">
              <time 
                dateTime={post.date}
                className="font-mono tabular-nums"
              >
                {post.date && format(new Date(post.date), 'yyyy년 MM월 dd일', { locale: ko })}
              </time>
              <span>·</span>
              <Link
                href={`/category/${post.category}`}
                className="hover:text-foreground transition-colors"
              >
                {post.category}
              </Link>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
              {post.title}
            </h1>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tag/${tag}`}
                    className="px-3 py-1 text-xs text-muted-foreground hover:text-foreground rounded-full bg-muted hover:bg-muted/80 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
          </header>

          {/* Post Content */}
          <div
            className="markdown-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Navigation */}
        <div className="mt-20 pt-12 border-t">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}

