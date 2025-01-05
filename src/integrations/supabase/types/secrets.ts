import { Json } from './json';

export interface SecretsTable {
  Row: {
    id: string
    name: string
    value: string
    created_at: string
  }
  Insert: {
    id?: string
    name: string
    value: string
    created_at?: string
  }
  Update: {
    id?: string
    name?: string
    value?: string
    created_at?: string
  }
  Relationships: []
}