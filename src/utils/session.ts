import { Session } from '@/models/Session';
import { IUserProfileLookupData, UserProfileLookupData } from '@/schemas/UserProfileLookup';
import { sessionIsOnline } from '@/utils/common';

export function getUserProfileLookupDataFromSession(
  session: Session,
  sessionId: number,
  timeThresholdForOnlineCheck: number
): IUserProfileLookupData {
  const uuid = session.uuid;
  const used = session.id == sessionId;
  const online = used || sessionIsOnline(session, timeThresholdForOnlineCheck);
  const ip_addr = session.ip_addr;
  const user_agent = session.user_agent;
  const created_at = session.created_at.toISOString();
  const updated_at = session.updated_at.toISOString();
  const deleted_at = session.deleted_at?.toISOString(); // auto hidden with undefined
  return new UserProfileLookupData(uuid, used, online, ip_addr, user_agent, created_at, updated_at, deleted_at);
}
