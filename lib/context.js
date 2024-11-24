import React from 'react'

const BlogContext = React.createContext()

export const BlogProvider = BlogContext.Provider
export const BlogConsumer = BlogContext.Consumer

export default BlogContext
