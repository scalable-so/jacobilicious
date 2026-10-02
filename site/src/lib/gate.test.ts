import { unzipSync, strFromU8 } from "fflate";
import { beforeAll, describe, expect, it } from "vitest";
import { firstStatus, outcomeFor } from "./decision";
import type { AccessRequest } from "./store";
import { idForEmail, readToken, samePin, signToken } from "./token";

beforeAll(() => {
  process.env.GATE_SECRET = "test-secret-test-secret-test-secret-0123";
});

describe("firstStatus", () => {
  it("sends the link at once from 8 points when mail works", () => {
    expect(firstStatus(8, "auto", true)).toBe("verify");
    expect(firstStatus(10, "auto", true)).toBe("verify");
  });
  it("puts 7 and below on the waitlist", () => {
    expect(firstStatus(7, "auto", true)).toBe("waitlist");
    expect(firstStatus(1, "auto", true)).toBe("waitlist");
  });
  it("waits for Jacob in manual mode or without mail", () => {
    expect(firstStatus(10, "manual", true)).toBe("waitlist");
    expect(firstStatus(10, "auto", false)).toBe("waitlist");
  });
});

describe("outcomeFor", () => {
  it("tells a high rating that waits the plain reason", () => {
    expect(outcomeFor("waitlist", 9)).toBe("review");
    expect(outcomeFor("waitlist", 5)).toBe("waitlist");
    expect(outcomeFor("verify", 9)).toBe("mail");
    expect(outcomeFor("approved", 5)).toBe("mail");
    expect(outcomeFor("rejected", 9)).toBe("closed");
  });
});

describe("tokens", () => {
  it("round-trips and checks the kind", () => {
    const t = signToken("dl", "abc", 60);
    expect(readToken(t, "dl")).toBe("abc");
    expect(readToken(t, "adm")).toBeNull();
  });
  it("rejects a changed, expired, or empty token", () => {
    const t = signToken("dl", "abc", 60);
    expect(readToken(`${t}x`, "dl")).toBeNull();
    expect(readToken(t.replace(/^./, "A"), "dl")).toBeNull();
    expect(readToken(signToken("dl", "abc", 60, Date.now() - 120_000), "dl")).toBeNull();
    expect(readToken("", "dl")).toBeNull();
    expect(readToken("a.b", "dl")).toBeNull();
  });
  it("gives one stable id per address", () => {
    expect(idForEmail("a@b.de")).toBe(idForEmail("a@b.de"));
    expect(idForEmail("a@b.de")).not.toBe(idForEmail("c@b.de"));
    expect(idForEmail("a@b.de")).toMatch(/^[a-f0-9]{24}$/);
  });
  it("compares the PIN and refuses an empty one", () => {
    expect(samePin("1234", "1234")).toBe(true);
    expect(samePin("1235", "1234")).toBe(false);
    expect(samePin("", "")).toBe(false);
  });
});

describe("zip", () => {
  it("holds the package, keeps scripts executable, and names the recipient", async () => {
    const { buildZip } = await import("./zip");
    const rec: AccessRequest = {
      id: "a".repeat(24),
      createdAt: "2026-10-02T10:00:00.000Z",
      name: "Mara",
      email: "mara@example.com",
      rating: 9,
      feedback: "",
      updates: false,
      status: "approved",
      mailsSent: 1,
      downloads: 0,
    };
    const out = unzipSync(buildZip(rec, new Date("2026-10-02T10:00:00Z")));
    const names = Object.keys(out);
    expect(names).toContain("jacobilicious/install.sh");
    expect(names).toContain("jacobilicious/README.md");
    expect(names).toContain("jacobilicious/skills/jacobilicious-setup/SKILL.md");
    expect(names.some((n) => n.startsWith("jacobilicious/site/") || n.includes("/.git/") || n.includes("/tests/"))).toBe(false);
    const access = strFromU8(out["jacobilicious/ACCESS.md"]);
    expect(access).toContain("Mara <mara@example.com>");
    expect(access).toContain("2026-10-02");
  });
});
