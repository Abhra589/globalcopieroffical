export interface OrdersTable {
  Row: {
    amount: number;
    copies: number;
    created_at: string;
    customer_email: string;
    customer_name: string;
    customer_phone: string;
    delivery_type: string;
    file_path: string;
    file_url: string;
    gsm: string;
    id: string;
    organization: string | null;
    pages: number;
    payment_status: string | null;
    print_sides: string;
    print_type: string;
    street: string | null;
    city: string | null;
    state: string | null;
    pincode: string | null;
  };
  Insert: {
    amount: number;
    copies?: number;
    created_at?: string;
    customer_email: string;
    customer_name: string;
    customer_phone: string;
    delivery_type: string;
    file_path: string;
    file_url: string;
    gsm: string;
    id?: string;
    organization?: string | null;
    pages: number;
    payment_status?: string | null;
    print_sides: string;
    print_type: string;
    street?: string | null;
    city?: string | null;
    state?: string | null;
    pincode?: string | null;
  };
  Update: {
    amount?: number;
    copies?: number;
    created_at?: string;
    customer_email?: string;
    customer_name?: string;
    customer_phone?: string;
    delivery_type?: string;
    file_path?: string;
    file_url?: string;
    gsm?: string;
    id?: string;
    organization?: string | null;
    pages?: number;
    payment_status?: string | null;
    print_sides?: string;
    print_type?: string;
    street?: string | null;
    city?: string | null;
    state?: string | null;
    pincode?: string | null;
  };
  Relationships: [];
}