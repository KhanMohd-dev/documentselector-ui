export const generateUniqueId = () => {
    // Use a simple approach for demonstration purposes to generate unique ID.
    return Math.random().toString(36).substr(2, 9);
  };