import { nads } from "../nads-data";
import NadsList from "../NadsList";

export default function Nads() {
  return (
    <div className="page-container p-8">
      <div > 
        <NadsList nads={nads}/>
      </div>
    </div>
  );
}