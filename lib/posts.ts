import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  content: string;
  excerpt?: string;
}

export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt?: string;
}

/**
 * 파일명에서 날짜를 추출합니다.
 * 형식: 2025-10-01-제목제목제목.md
 */
function extractDateFromFilename(filename: string): string | null {
  const dateRegex = /^(\d{4}-\d{2}-\d{2})-/;
  const match = filename.match(dateRegex);
  return match ? match[1] : null;
}

/**
 * 파일명에서 슬러그를 생성합니다.
 * 날짜 부분을 제거하고 .md 확장자를 제거합니다.
 */
function extractSlugFromFilename(filename: string): string {
  return filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
}

/**
 * 모든 카테고리를 가져옵니다.
 */
export function getAllCategories(): string[] {
  try {
    const categories = fs.readdirSync(postsDirectory);
    return categories.filter(cat => {
      const catPath = path.join(postsDirectory, cat);
      return fs.statSync(catPath).isDirectory();
    });
  } catch (error) {
    return [];
  }
}

/**
 * 특정 카테고리의 모든 포스트 메타데이터를 가져옵니다.
 */
export function getPostsByCategory(category: string): PostMetadata[] {
  try {
    const categoryPath = path.join(postsDirectory, category);
    const filenames = fs.readdirSync(categoryPath);
    
    const posts = filenames
      .filter(filename => filename.endsWith('.md'))
      .map(filename => {
        const filePath = path.join(categoryPath, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);
        
        const dateFromFilename = extractDateFromFilename(filename);
        const slug = extractSlugFromFilename(filename);
        
        // excerpt 생성 (첫 200자)
        const excerpt = data.excerpt || content.slice(0, 200).replace(/\n/g, ' ') + '...';
        
        return {
          slug,
          title: data.title || slug,
          date: data.date || dateFromFilename || '',
          category,
          tags: data.tags || [],
          excerpt,
        };
      });
    
    // 날짜순 정렬 (최신순)
    return posts.sort((a, b) => {
      if (a.date > b.date) return -1;
      if (a.date < b.date) return 1;
      return 0;
    });
  } catch (error) {
    return [];
  }
}

/**
 * 모든 포스트 메타데이터를 가져옵니다.
 */
export function getAllPosts(): PostMetadata[] {
  const categories = getAllCategories();
  const allPosts: PostMetadata[] = [];
  
  categories.forEach(category => {
    const posts = getPostsByCategory(category);
    allPosts.push(...posts);
  });
  
  // 날짜순 정렬 (최신순)
  return allPosts.sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  });
}

/**
 * 특정 태그의 모든 포스트를 가져옵니다.
 */
export function getPostsByTag(tag: string): PostMetadata[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.tags.includes(tag));
}

/**
 * 모든 태그를 가져옵니다.
 */
export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tags = new Set<string>();
  
  allPosts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });
  
  return Array.from(tags).sort();
}

/**
 * 특정 포스트의 전체 데이터를 가져옵니다.
 */
export async function getPostData(category: string, slug: string): Promise<PostData | null> {
  try {
    // URL 디코딩
    const decodedSlug = decodeURIComponent(slug);
    
    const categoryPath = path.join(postsDirectory, category);
    const filenames = fs.readdirSync(categoryPath);
    
    // 슬러그와 일치하는 파일 찾기
    const filename = filenames.find(fn => {
      const fileSlug = extractSlugFromFilename(fn);
      return fileSlug === decodedSlug && fn.endsWith('.md');
    });
    
    if (!filename) {
      return null;
    }
    
    const filePath = path.join(categoryPath, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // 마크다운을 HTML로 변환
    const processedContent = await remark()
      .use(gfm)
      .use(html, { sanitize: false })
      .process(content);
    const contentHtml = processedContent.toString();
    
    const dateFromFilename = extractDateFromFilename(filename);
    const excerpt = data.excerpt || content.slice(0, 200).replace(/\n/g, ' ') + '...';
    
    return {
      slug: decodedSlug,
      title: data.title || decodedSlug,
      date: data.date || dateFromFilename || '',
      category,
      tags: data.tags || [],
      content: contentHtml,
      excerpt,
    };
  } catch (error) {
    console.error('Error getting post data:', error);
    return null;
  }
}

/**
 * 모든 포스트의 경로를 가져옵니다. (정적 생성용)
 */
export function getAllPostPaths(): Array<{ category: string; slug: string }> {
  const categories = getAllCategories();
  const paths: Array<{ category: string; slug: string }> = [];
  
  categories.forEach(category => {
    const posts = getPostsByCategory(category);
    posts.forEach(post => {
      paths.push({
        category,
        slug: post.slug,
      });
    });
  });
  
  return paths;
}

