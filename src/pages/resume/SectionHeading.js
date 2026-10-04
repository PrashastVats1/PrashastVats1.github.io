/** A fantasy section title paired with its plain professional meaning. */
export default function SectionHeading({ id, title, plain, level = 2 }) {
  const Heading = `h${level}`;
  return (
    <div className="pv-section-heading">
      <Heading id={id} className="pv-section-heading__title">{title}</Heading>
      {plain && <p className="pv-section-heading__plain">{plain}</p>}
    </div>
  );
}
