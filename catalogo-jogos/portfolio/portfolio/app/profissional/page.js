import Timeline from "@/components/Timeline";
import { profissional } from "@/lib/dados";

export const metadata = { title: "Experiência profissional | Suellen" };

export default function Profissional() {
  return (
    <>
      <h1>Experiência profissional</h1>
      <Timeline itens={profissional} />
    </>
  );
}
