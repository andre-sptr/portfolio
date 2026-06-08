import { skills } from "@/data/skills";

export function StaticExperimentPreview() {
  const groups = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
    acc[skill.category] = acc[skill.category] ?? [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {Object.entries(groups).map(([category, items]) => (
        <div key={category} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
          <h3 className="mb-3 text-sm font-semibold text-[var(--warm-white)]">{category}</h3>
          <div className="flex flex-wrap gap-2">
            {items.map((skill) => (
              <span
                key={skill.id}
                className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-muted-foreground"
              >
                {skill.label}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
