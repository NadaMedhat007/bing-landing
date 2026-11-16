// Turns email addresses into mailto: links and binghub.net domains into web links.
const PATTERN = /([\w.+-]+@[\w-]+(?:\.[\w-]+)+)|(\b(?:portal\.)?binghub\.net\b)/g;

export default function Linkify({ text }) {
  const out = [];
  let last = 0;
  let m;
  PATTERN.lastIndex = 0;
  while ((m = PATTERN.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) {
      out.push(
        <a key={m.index} className="text-link" href={`mailto:${m[1]}`}>
          {m[1]}
        </a>
      );
    } else {
      out.push(
        <a key={m.index} className="text-link" href={`https://${m[2]}`} target="_blank" rel="noreferrer">
          {m[2]}
        </a>
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}
