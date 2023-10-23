function calculateLocalStorageMemoryUsage() {
    let totalMemoryUsage = 0;
  
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
  
      // Calculate the memory usage for the key and value
      const keyMemoryUsage = new TextEncoder().encode(key).length;
      const valueMemoryUsage = new TextEncoder().encode(value).length;
  
      totalMemoryUsage += keyMemoryUsage + valueMemoryUsage;
    }
  
    return totalMemoryUsage;
  }
  
  function formatMemoryUsage(bytes) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let size = bytes;
    let i = 0;
  
    while (size >= 1024 && i < units.length - 1) {
      size /= 1024;
      i++;
    }
  
    return `${size.toFixed(2)} ${units[i]}`;
  }
  
  function updateMemoryUsage() {
    const totalMemoryUsage = calculateLocalStorageMemoryUsage();
    const formattedTotalMemoryUsage = formatMemoryUsage(totalMemoryUsage);
    console.log('Total memory usage of all local storage items:', formattedTotalMemoryUsage);
  }
  
  // Update the memory usage every 1 second
  setInterval(updateMemoryUsage, 1000);
  