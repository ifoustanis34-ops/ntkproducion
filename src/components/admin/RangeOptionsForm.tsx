"use client";

import { useActionState, useState } from "react";
import { saveRangeOptionsAction, type FormState } from "@/app/admin/actions";
import type { OptionGroup, RangeId } from "@/lib/catalog/types";
import { buttonStyles } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";
import { OptionGroupsEditor } from "./OptionGroupsEditor";

export function RangeOptionsForm({ range, groups }: { range: RangeId; groups: OptionGroup[] }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveRangeOptionsAction.bind(null, range), {});
  const [value, setValue] = useState(groups);
  return (
    <form action={action} className="space-y-4">
      <OptionGroupsEditor name="options" groups={value} onChange={setValue} />
      <div className="flex flex-wrap items-center gap-4">
        <button disabled={pending} className={cn(buttonStyles({ variant: "primary" }), "disabled:opacity-60")}>
          {pending ? "Enregistrement…" : "Enregistrer les options de la gamme"}
        </button>
        {state.error && <p role="alert" className="text-sm font-medium text-red-700">{state.error}</p>}
        {state.ok && !pending && <p role="status" className="text-sm font-medium text-green-700">{state.message}</p>}
      </div>
    </form>
  );
}
