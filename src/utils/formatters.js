export function formatDuration(duration) {
  const minutes = Math.floor(duration);
  const seconds = Math.round((duration - minutes) * 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}