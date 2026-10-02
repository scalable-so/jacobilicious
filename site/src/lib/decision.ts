import { THRESHOLD } from "./config";

export type Status = "verify" | "waitlist" | "approved" | "rejected";

/**
 * What happens to a new request.
 * - "verify": the personal link goes out by mail; opening it proves the address.
 * - "waitlist": Jacob reads the feedback and decides.
 * A rating below the threshold always waits. A rating at or above it waits
 * too when Jacob approves everyone by hand or when no mail can be sent.
 */
export function firstStatus(rating: number, mode: "auto" | "manual", canMail: boolean): Status {
  if (rating < THRESHOLD) return "waitlist";
  if (mode === "manual" || !canMail) return "waitlist";
  return "verify";
}

/** The message the visitor sees. A high rating that waits is told so plainly. */
export function outcomeFor(status: Status, rating: number): "mail" | "waitlist" | "review" | "closed" {
  if (status === "rejected") return "closed";
  if (status === "verify" || status === "approved") return "mail";
  return rating >= THRESHOLD ? "review" : "waitlist";
}
