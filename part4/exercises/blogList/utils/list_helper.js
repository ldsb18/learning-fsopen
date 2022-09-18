const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs === []
        ? 0
        : blogs.reduce( (sum, blog) => {
            return blog.likes + sum
        }, 0)
}

module.exports = {
    dummy,
    totalLikes
}