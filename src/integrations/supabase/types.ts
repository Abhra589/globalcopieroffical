export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      appointment_bookings: {
        Row: {
          booking_fee: number | null
          calendly_confirmed: boolean | null
          client_name: string
          created_at: string | null
          id: number
          status: string | null
          user_id: string | null
        }
        Insert: {
          booking_fee?: number | null
          calendly_confirmed?: boolean | null
          client_name: string
          created_at?: string | null
          id?: number
          status?: string | null
          user_id?: string | null
        }
        Update: {
          booking_fee?: number | null
          calendly_confirmed?: boolean | null
          client_name?: string
          created_at?: string | null
          id?: number
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointment_bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_requests: {
        Row: {
          created_at: string
          id: number
          message: string
          status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          message: string
          status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          message?: string
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "custom_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      graphic_design_orders: {
        Row: {
          created_at: string
          description: string
          id: number
          quantity: number
          status: string | null
          total_cost: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          quantity: number
          status?: string | null
          total_cost: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          quantity?: number
          status?: string | null
          total_cost?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "graphic_design_orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      package_subscriptions: {
        Row: {
          created_at: string
          end_date: string | null
          id: number
          is_free_month: boolean | null
          package_id: number | null
          start_date: string
          status: string | null
          user_id: string | null
          website_project_id: number | null
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          id?: number
          is_free_month?: boolean | null
          package_id?: number | null
          start_date?: string
          status?: string | null
          user_id?: string | null
          website_project_id?: number | null
        }
        Update: {
          created_at?: string
          end_date?: string | null
          id?: number
          is_free_month?: boolean | null
          package_id?: number | null
          start_date?: string
          status?: string | null
          user_id?: string | null
          website_project_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "package_subscriptions_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "social_media_packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "package_subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "package_subscriptions_website_project_id_fkey"
            columns: ["website_project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          id: number
          service_id: number | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          id?: never
          service_id?: number | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          id?: never
          service_id?: number | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_items: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          drive_link: string | null
          id: number
          image_url: string
          service_type: string
          title: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          drive_link?: string | null
          id?: number
          image_url: string
          service_type: string
          title: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          drive_link?: string | null
          id?: number
          image_url?: string
          service_type?: string
          title?: string
        }
        Relationships: []
      }
      post_revisions: {
        Row: {
          content: string
          created_at: string
          id: number
          post_id: number | null
          status: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: number
          post_id?: number | null
          status?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: number
          post_id?: number | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_revisions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "scheduled_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_subscriptions: {
        Row: {
          created_at: string
          end_date: string | null
          id: number
          plan_type: string
          posts_per_month: number | null
          posts_remaining: number
          start_date: string
          status: string | null
          subscription_type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          id?: number
          plan_type: string
          posts_per_month?: number | null
          posts_remaining: number
          start_date?: string
          status?: string | null
          subscription_type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          end_date?: string | null
          id?: number
          plan_type?: string
          posts_per_month?: number | null
          posts_remaining?: number
          start_date?: string
          status?: string | null
          subscription_type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          role: Database["public"]["Enums"]["user_role"] | null
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
        }
        Relationships: []
      }
      project_status_updates: {
        Row: {
          created_at: string
          created_by: string | null
          id: number
          message: string | null
          progress: number | null
          project_id: number | null
          status: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: number
          message?: string | null
          progress?: number | null
          project_id?: number | null
          status: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: number
          message?: string | null
          progress?: number | null
          project_id?: number | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_status_updates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_status_updates_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string
          description: string | null
          id: number
          manager_id: string | null
          payment_status: string | null
          progress: number | null
          status: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          manager_id?: string | null
          payment_status?: string | null
          progress?: number | null
          status?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          manager_id?: string | null
          payment_status?: string | null
          progress?: number | null
          status?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      refunds: {
        Row: {
          amount: number
          created_at: string
          id: number
          payment_id: number | null
          reason: string | null
          status: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          id?: never
          payment_id?: number | null
          reason?: string | null
          status?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          id?: never
          payment_id?: number | null
          reason?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "refunds_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
        ]
      }
      scheduled_posts: {
        Row: {
          content: string
          created_at: string
          engagement_data: Json | null
          id: number
          media_url: string | null
          platform: string
          scheduled_time: string
          status: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          engagement_data?: Json | null
          id?: number
          media_url?: string | null
          platform: string
          scheduled_time: string
          status?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          engagement_data?: Json | null
          id?: number
          media_url?: string | null
          platform?: string
          scheduled_time?: string
          status?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scheduled_posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          category: string
          created_at: string
          description: string
          id: number
          package_type: string | null
          price: number
          title: string
          type: string
        }
        Insert: {
          category?: string
          created_at?: string
          description: string
          id?: number
          package_type?: string | null
          price: number
          title: string
          type: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          id?: number
          package_type?: string | null
          price?: number
          title?: string
          type?: string
        }
        Relationships: []
      }
      social_media_packages: {
        Row: {
          created_at: string
          description: string
          features: Json
          id: number
          name: string
          price: number
        }
        Insert: {
          created_at?: string
          description: string
          features: Json
          id?: number
          name: string
          price: number
        }
        Update: {
          created_at?: string
          description?: string
          features?: Json
          id?: number
          name?: string
          price?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      clean_old_appointments: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      ensure_admin_role: {
        Args: {
          admin_email: string
        }
        Returns: undefined
      }
    }
    Enums: {
      user_role: "admin" | "manager" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never