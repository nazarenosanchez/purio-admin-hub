import { Construction } from "lucide-react";

export default function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent mb-4">
        <Construction className="h-8 w-8" />
      </div>
      <h1 className="text-xl font-bold font-heading mb-2">{title}</h1>
      <p className="text-sm text-muted-foreground max-w-sm">
        Este módulo estará disponible próximamente. Estamos trabajando para traerte la mejor experiencia.
      </p>
    </div>
  );
}
