export type BrainPostType =
  | "essay"
  | "learning"
  | "consuming"

export const brainPostTypes: Record<
  BrainPostType,
  {
    label: string;
    description: string;
  }
> = {
  essay: {
    label: "essay",
    description: "Longer thoughts I actually tried to make coherent.",
  },
  "learning": {
    label: "Learning Logs",
    description: "What I am learning, building, debugging, or overthinking.",
  },
  "consuming": {
    label: "Learning Logs",
    description: "What I am learning, building, debugging, or overthinking.",
  },
};
