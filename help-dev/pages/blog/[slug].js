import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import marked from 'marked'
import Link from 'next/Link'

export default function PostPage({
    frontmatter: {title, date, cover_image, category},
    slug,
    content
}) {
    return <>
        <img src={cover_image} />
        <h4>{category}</h4>
        <h1>{title}</h1>
        <div className='post-date'>Posted on {date}</div>
        <div className='post-body'>
            <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        </div>
    </>
}

// <Link href='/'><a className='btn btn-back'>Go Back</a></Link>

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('posts'))
    const paths = files.map(filename => ({
        params: {
            slug: filename.replace('.md', '')
        }
    }))
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params: {slug}}) {
    const markdownWithMeta = fs.readFileSync(path.join('posts', slug + '.md'), 'utf-8')
    const {data:frontmatter, content} = matter(markdownWithMeta)
    return {
        props: {
            frontmatter,
            slug,
            content
        }
    }
}