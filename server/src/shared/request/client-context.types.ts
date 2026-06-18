export interface GeoInfo {
  country?: string;
  region?: string;
  city?: string;
}

export interface DeviceInfo {
  browser?: string;
  os?: string;
  deviceType?: string;
}

/** Everything we can learn about a visitor from the request, captured once and reused by every module. */
export interface ClientContext {
  ip: string;
  userAgent: string;
  sessionId?: string;
  referrer?: string;
  geo?: GeoInfo;
  device?: DeviceInfo;
}
