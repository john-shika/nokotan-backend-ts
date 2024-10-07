import { Session } from '@/models/Session';
import { IUserSessionLookupData, UserSessionLookupData } from '@/schemas/UserSessionLookup';
import { sessionIsOnline } from '@/utils/common';

export function getUserSessionLookup(
  session: Session,
  sessionId: number,
  timeThresholdForOnlineCheck: number
): IUserSessionLookupData {
  const uuid = session.uuid;
  const used = session.id == sessionId;
  const online = used || sessionIsOnline(session, timeThresholdForOnlineCheck);
  const ip_addr = session.ip_addr;
  const user_agent = session.user_agent;
  const created_at = session.created_at.toISOString();
  const updated_at = session.updated_at.toISOString();
  const deleted_at = session.deleted_at?.toISOString(); // auto hidden with undefined
  return new UserSessionLookupData(uuid, used, online, ip_addr, user_agent, created_at, updated_at, deleted_at);
}
