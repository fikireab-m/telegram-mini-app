type User = {
  id: string
  telegramId: string
  earnings: number
  completedTasks: string[]
  referredBy?: string
  referrals: string[]
}

class Store {
  private users: Map<string, User> = new Map()

  createUser(telegramId: string, referredBy?: string): User {
    const id = Math.random().toString(36).substr(2, 9)
    const user: User = {
      id,
      telegramId,
      earnings: 0,
      completedTasks: [],
      referredBy,
      referrals: [],
    }
    this.users.set(id, user)
    return user
  }

  getUser(id: string): User | undefined {
    return this.users.get(id)
  }

  getUserByTelegramId(telegramId: string): User | undefined {
    return Array.from(this.users.values()).find((user) => user.telegramId === telegramId)
  }

  updateUser(id: string, updates: Partial<User>): User | undefined {
    const user = this.users.get(id)
    if (user) {
      Object.assign(user, updates)
      this.users.set(id, user)
    }
    return user
  }

  addReferral(referrerId: string, referredId: string): void {
    const referrer = this.users.get(referrerId)
    if (referrer) {
      referrer.referrals.push(referredId)
      referrer.earnings += 10 // $10 per referral
      this.users.set(referrerId, referrer)
    }
  }
}

export const store = new Store()

