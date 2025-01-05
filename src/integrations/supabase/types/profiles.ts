import { Json } from './json';

export interface ProfilesTable {
  Row: {
    city: string
    created_at: string
    email: string
    first_name: string
    id: string
    is_admin: boolean | null
    last_name: string
    phone: string
    pincode: string
    state: string
    street: string
  }
  Insert: {
    city: string
    created_at?: string
    email: string
    first_name: string
    id: string
    is_admin?: boolean | null
    last_name: string
    phone: string
    pincode: string
    state: string
    street: string
  }
  Update: {
    city?: string
    created_at?: string
    email?: string
    first_name?: string
    id?: string
    is_admin?: boolean | null
    last_name?: string
    phone?: string
    pincode?: string
    state?: string
    street?: string
  }
  Relationships: []
}