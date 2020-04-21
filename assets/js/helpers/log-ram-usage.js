export function logRamUsage () {
  const ramMb = Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100
  console.log(`Node RAM usage: ${ramMb}mb`)
}
