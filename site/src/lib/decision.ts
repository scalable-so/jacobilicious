import { THRESHOLD } from "./config";

export type Status = "waitlist" | "approved" | "rejected";

/**
 * What happens to a new request. Access belongs to the email address.
 * - "approved": the address may open the package.
 * - "waitlist": Jacob reads the feedback and decides.
 * A rating below the threshold always waits. A rating at or above it waits
 * too when Jacob approves everyone by hand.
 */
export function firstStatus(rating: number, mode: "auto" | "manual"): Status {
  return rating >= THRESHOLD && mode === "auto" ? "approved" : "waitlist";
}

/** The message the visitor sees. A high rating that waits is told so plainly. */
export function outcomeFor(status: Status, rating: number): "open" | "waitlist" | "review" | "closed" {
  if (status === "rejected") return "closed";
  if (status === "approved") return "open";
  return rating >= THRESHOLD ? "review" : "waitlist";
}
