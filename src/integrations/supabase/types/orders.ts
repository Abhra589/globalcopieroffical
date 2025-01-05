import { Json } from './json';

export interface OrdersTable {
  Row: {
    amount: number
    copies: number
    created_at: string
    customer_email: string
    customer_name: string
    customer_phone: string
    delivery_type: string
    file_path: string
    file_url: string
    gsm: string
    id: string
    organization: string | null
    pages: number
    payment_status: string | null
    print_sides: string
    print_type: string
  }
  Insert: {
    amount: number
    copies?: number
    created_at?: string
    customer_email: string
    customer_name: string
    customer_phone: string
    delivery_type: string
    file_path: string
    file_url: string
    gsm: string
    id?: string
    organization?: string | null
    pages: number
    payment_status?: string | null
    print_sides: string
    print_type: string
  }
  Update: {
    amount?: number
    copies?: number
    created_at?: string
    customer_email?: string
    customer_name?: string
    customer_phone?: string
    delivery_type?: string
    file_path?: string
    file_url?: string
    gsm?: string
    id?: string
    organization?: string | null
    pages?: number
    payment_status?: string | null
    print_sides?: string
    print_type?: string
  }
  Relationships: []
}