import type { Request } from "express";
import geoip from "geoip-lite";
import { UAParser } from "ua-parser-js";
import type { ClientContext, DeviceInfo } from "./client-context.types.js";

export function getClientContext(req: Request): ClientContext {
  const ip = req.ip ?? "";
  const userAgent = req.get("user-agent") ?? "";
  const sessionId = req.get("x-session-id") ?? undefined;
  const referrer = req.get("referer") ?? undefined;

  const location = geoip.lookup(ip);
  const geo = location
    ? { country: location.country, region: location.region, city: location.city }
    : undefined;

  const device = userAgent ? parseDevice(userAgent) : undefined;

  return { ip, userAgent, sessionId, referrer, geo, device };
}

function parseDevice(userAgent: string): DeviceInfo {
  const result = new UAParser(userAgent).getResult();
  return {
    browser: result.browser.name,
    os: result.os.name,
    deviceType: result.device.type ?? "desktop",
  };
}
