import { describe, expect, it } from "vitest";
import { fallbackMailto } from "@/components/forms/fallback-mailto";

describe("fallbackMailto", () => {
  it("carries the answers as a percent-encoded subject and CRLF body", () => {
    expect(
      fallbackMailto("hello@driftpilot.ca", "Project inquiry", [
        ["Name", "Alex Johnson"],
        ["Budget", "$5,000 – $15,000"],
      ]),
    ).toBe(
      "mailto:hello@driftpilot.ca?subject=Project%20inquiry" +
        "&body=Name%3A%20Alex%20Johnson%0D%0ABudget%3A%20%245%2C000%20%E2%80%93%20%2415%2C000%0D%0A",
    );
  });

  it("never encodes a space as '+', which mail clients can show literally", () => {
    expect(fallbackMailto("a@b.c", "Two words", [["Note", "one two"]])).not.toContain("+");
  });

  it("keeps a missing answer as an empty line rather than 'undefined'", () => {
    const url = fallbackMailto("a@b.c", "S", [["Company", undefined]]);
    expect(decodeURIComponent(url.split("body=")[1])).toBe("Company: \r\n");
  });
});
