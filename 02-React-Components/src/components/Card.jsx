import { useState } from "react";
import Button from "./Button";

function Card({ title, description, tag }) {
  const [likes, setLikes] = useState(0);
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="card">
      {tag && <span className="tag">{tag}</span>}
      <h3>{title}</h3>
      <p>{expanded ? description : `${description.slice(0, 60)}...`}</p>
      <div className="card-actions">
        <Button variant="outline" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Show less" : "Read more"}
        </Button>
        <Button onClick={() => setLikes(likes + 1)}>👍 {likes}</Button>
      </div>
    </article>
  );
}
export default Card;
