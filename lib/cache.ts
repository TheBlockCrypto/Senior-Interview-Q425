import { createStorage } from 'unstorage'
import memoryDriver from 'unstorage/drivers/memory'
import fsDriver from 'unstorage/drivers/fs'

export const storage = createStorage({
  driver: process.env.NODE_ENV === 'production' 
    ? fsDriver({ base: './cache' })
    : memoryDriver()
})

export const cache = {
  async get<T = any>(key: string): Promise<T | null> {
    const value = await storage.getItem(key)
    return value as T | null
  },
  
  async set(key: string, value: any, ttl?: number): Promise<void> {
    await storage.setItem(key, value)
    if (ttl) {
      setTimeout(() => storage.removeItem(key), ttl * 1000)
    }
  },
  
  async del(key: string): Promise<void> {
    await storage.removeItem(key)
  },
  
  async clear(): Promise<void> {
    await storage.clear()
  }
}