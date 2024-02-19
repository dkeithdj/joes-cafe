"use client";

import {
  ArrowUpCircle,
  Check,
  CheckCircle2,
  ChevronsUpDown,
  Circle,
  HelpCircle,
  LucideIcon,
  User2,
  XCircle,
} from "lucide-react";

import { cn } from "@customer/lib/utils";
import { Button } from "@ui/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@ui/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/components/ui/popover";
import { useStaff } from "@customer/hooks/useStaff";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/components/ui/select";

type Status = {
  value: string;
  label: string;
  icon: LucideIcon;
};

const statuses: Status[] = [
  {
    value: "backlog",
    label: "Backlog",
    icon: HelpCircle,
  },
  {
    value: "todo",
    label: "Todo",
    icon: Circle,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: ArrowUpCircle,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircle2,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: XCircle,
  },
];
const frameworks = [
  {
    value: "next .js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];
export function OrderSelect({ value, setValue }) {
  const [open, setOpen] = useState(false);

  const { data, isSuccess: staffSuccess, isLoading } = useStaff();

  if (isLoading) return <div>Loading..</div>;

  if (staffSuccess) {
    const edit: { value: string; label: string }[] = data.map((person) => ({
      value: person.id,
      label: person.last_name,
    }));

    const staff = edit;

    const handleChange = (e) => {
      setValue(e.target.value);
    };

    return (
      <Select>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Staff" />
        </SelectTrigger>
        <SelectContent>
          {staff.map((item, i) => (
            <SelectItem key={i} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
}
