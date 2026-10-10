import { useState } from "react";
import Avatar from "../../components/fantasy/Avatar";
import { Divider } from "../../components/fantasy/Ornaments";
import ArchiveRoom from "./ArchiveRoom";
import FolioEntry from "./FolioEntry";
import { POSTS, TOPICS, postsInTopic } from "./archive";

const writings = (n) => `${n} ${n === 1 ? "writing" : "writings"}`;

function TopicShelves({ topic, onChange }) {
  const shelves = [{ id: null, label: "All writings", count: POSTS.length }, ...TOPICS.map((t) => ({ id: t, label: t, count: postsInTopic(t).length }))];
  return (
    <div className="pv-shelves" role="group" aria-labelledby="pv-shelves-label">
      <p id="pv-shelves-label" className="pv-shelves__label">
        Browse by topic
      </p>
      <ul className="pv-shelves__list">
        {shelves.map((shelf) => (
          <li key={shelf.label}>
            <button type="button" className="pv-shelves__button" aria-pressed={topic === shelf.id} onClick={() => onChange(shelf.id)}>
              {shelf.label} <span className="pv-shelves__count">{shelf.count}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The landing view: the scholar's desk, the newest folio, and the catalogue. */
export default function ScholarsArchive() {
  const [topic, setTopic] = useState(null);
  const [latest, ...earlier] = postsInTopic(topic);
  const shown = earlier.length + 1;

  return (
    <ArchiveRoom className="pv-archive-index">
      <header className="pv-archive__header">
        <div className="pv-archive__portrait">
          <Avatar variant="scholar" size={168} />
        </div>
        <div className="pv-archive__intro">
          <p className="pv-archive__eyebrow">The Scholar's Archive</p>
          <h1 className="pv-archive__title">Archmage's Notes</h1>
          <p className="pv-archive__plain">Blog &amp; Writing</p>
          <Divider className="pv-archive__divider" />
          <p className="pv-archive__description">
            I write about AI, software engineering, automation, and the occasional unexpected lesson from everyday life.
          </p>
          <p className="pv-archive__count">{writings(POSTS.length)} in the archive</p>
        </div>
      </header>

      <TopicShelves topic={topic} onChange={setTopic} />
      <p className="pv-visually-hidden" aria-live="polite">
        {topic ? `Showing ${writings(shown)} on ${topic}` : `Showing all ${writings(shown)}`}
      </p>

      <section className="pv-archive-section" aria-labelledby="pv-archive-latest">
        <h2 id="pv-archive-latest" className="pv-archive-section__title">
          The Latest Folio <span className="pv-archive-section__plain">Newest post</span>
        </h2>
        <FolioEntry post={latest} featured />
      </section>

      {earlier.length > 0 && (
        <section className="pv-archive-section" aria-labelledby="pv-archive-catalogue">
          <h2 id="pv-archive-catalogue" className="pv-archive-section__title">
            The Catalogue <span className="pv-archive-section__plain">Earlier posts</span>
          </h2>
          <ol className="pv-catalogue">
            {earlier.map((post) => (
              <li key={post.slug} className="pv-catalogue__item">
                <FolioEntry post={post} />
              </li>
            ))}
          </ol>
        </section>
      )}
    </ArchiveRoom>
  );
}
