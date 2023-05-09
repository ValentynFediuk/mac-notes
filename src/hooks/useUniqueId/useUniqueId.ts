function useUniqueId() {
  const randomBytes = new Uint8Array(16);
  window.crypto.getRandomValues(randomBytes);
  const id = Array.from(randomBytes, (byte) =>
    byte.toString(16).padStart(2, '0')
  ).join('');
  return id;
}

export default useUniqueId;
