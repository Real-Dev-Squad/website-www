export const removePeerLogsTransformer = (logs) => {
  const transformedData = logs?.map((log) => {
    return {
      eventId: log?.body?.event_id,
      removedById: log?.meta?.removed_by_id,
      removedByUsername: log?.meta?.removed_by_username,
      peerId: log?.body?.peer_id,
      peerName: log?.body?.peer_name,
      reason: log?.body?.reason,
      timestamp: new Date(log?.timestamp?._seconds * 1000).toUTCString(),
      timestampInSeconds: log?.timestamp?._seconds,
    };
  });
  return transformedData;
};
