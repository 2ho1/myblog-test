'use client';

import { useState } from 'react';
import Link from 'next/link';

interface MobileSidebarProps {
  categories: string[];
  tags: string[];
  currentCategory?: string;
  currentTag?: string;
}

export function MobileSidebar({ categories, tags, currentCategory, currentTag }: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-lg bg-background border shadow-lg hover:shadow-xl transition-shadow"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-full w-80 bg-card border-r border-border z-50
          transform transition-transform duration-300 ease-in-out
          lg:hidden shadow-2xl
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-6 h-full overflow-y-auto">
          {/* Logo */}
          <div className="mb-8 pb-6 border-b border-border/30">
            <Link
              href="/"
              className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
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
                onClick={() => setIsOpen(false)}
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
                  onClick={() => setIsOpen(false)}
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
                  onClick={() => setIsOpen(false)}
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
