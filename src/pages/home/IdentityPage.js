import Avatar from "../../components/fantasy/Avatar";
import { Divider } from "../../components/fantasy/Ornaments";
import { IDENTITY } from "./homeContent";

export default function IdentityPage() {
  return (
    <div className="pv-identity">
      <Avatar variant="regular" size={132} className="pv-identity__avatar" />
      <p className="pv-identity__eyebrow">The Adventures of</p>
      <h2 className="pv-identity__name">{IDENTITY.name}</h2>
      <p className="pv-identity__class">{IDENTITY.fantasyTitle}</p>
      <p className="pv-page-header__plain">{IDENTITY.title}</p>
      <Divider className="pv-identity__divider" />
      <p className="pv-identity__statement">{IDENTITY.statement}</p>
      <dl className="pv-identity__facts">
        {IDENTITY.facts.map((fact) => (
          <div key={fact.label} className="pv-identity__fact">
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
