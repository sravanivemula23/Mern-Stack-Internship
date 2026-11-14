// For contrast: a NORMAL (global) stylesheet. ".title" here is global and
// would restyle EVERY element with class "title" if modules were not used.
import "./GlobalBox.css";

function GlobalBox() {
  return (
    <div className="global-box">
      <h3 className="title">Global CSS (.title)</h3>
      <p>Plain CSS is global. This one class name can leak into other components.</p>
    </div>
  );
}
export default GlobalBox;
