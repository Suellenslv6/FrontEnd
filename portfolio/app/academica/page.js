import Timeline from "@/components/Timeline";
import { academica } from "@/lib/dados";

export const metadata = { title: "Experiência acadêmica | Suellen" };

export default function Academica() {
  return (
    <>
      <h1>Experiência acadêmica</h1>
      <Timeline itens={academica} />
    </>
  );
}
