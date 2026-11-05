function BlogCard({ post }) {
  return (
    <article className="blog-card">
      <div className="thumb" style={{ background: post.image }}>{post.category}</div>
      <div className="body">
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <small>{post.author} &middot; {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</small>
      </div>
    </article>
  );
}
export default BlogCard;
