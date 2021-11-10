import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import Post from '../components/post'
import Head from 'next/head'

import { sortByDate } from '../utils'

export default function Index({ posts }) {
    return (
        <main className="container">
            <Head>
                <title>Znalostní báze | Studio Denali</title>
            </Head>
            <header>
                <nav>
                    <p>Znalostní báze</p>
                </nav>
            </header>
            <div className="posts">
                {posts.map((post, index) => (
                    <Post key={index} post={post} />
                ))}
            </div>
        </main>
    )
}

export async function getStaticProps() {
    const files = fs.readdirSync(path.join('posts'))
    const posts = files.map((filename) => {
        const slug = filename.replace('.md', '')
        const markdownWithMeta = fs.readFileSync(
            path.join('posts', filename),
            'utf-8'
        )
        const { data: frontmatter } = matter(markdownWithMeta)
        return {
            slug,
            frontmatter
        }

    })
    return {
        props: {
            posts: posts.sort(sortByDate)
        }
    }
}