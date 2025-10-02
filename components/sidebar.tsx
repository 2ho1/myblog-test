import Link from 'next/link';
import { getAllCategories, getAllTags } from '@/lib/posts';

interface SidebarProps {
  currentCategory?: string;
  currentTag?: string;
}

export function Sidebar({ currentCategory, currentTag }: SidebarProps) {
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <aside className="hidden lg:block w-64 bg-card/50 border-r border-border/50 backdrop-blur-sm">
        <div className="p-6 h-screen overflow-y-auto sticky top-0">
          {/* Logo */}
          <div className="mb-8 pb-6 border-b border-border/30">
            <Link
              href="/"
              className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
            >
              편집자의 일상
            </Link>
            <p className="text-sm text-muted-foreground mt-2">
              개발과 일상을 기록하는 공간
            </p>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
              카테고리
            </h3>
            <nav className="space-y-1">
              <Link
                href="/"
                className={`
                  block px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${!currentCategory && !currentTag
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }
                `}
              >
                전체
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/category/${category}`}
                  className={`
                    block px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                    ${currentCategory === category
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }
                  `}
                >
                  {category}
                </Link>
              ))}
            </nav>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
              태그
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tag/${tag}`}
                  className={`
                    px-3 py-1.5 text-xs rounded-full transition-all duration-200
                    ${currentTag === tag
                      ? 'bg-accent text-accent-foreground shadow-sm'
                      : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                    }
                  `}
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </aside>
  );
}
